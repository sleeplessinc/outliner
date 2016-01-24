

seq_count = 0;
seq = function() {
	seq_count += 1;
	return seq_count;
}


tpl_node = null;

data = {
	tree: [],
};


model_to_ui = function(e, v) {
	log("model_to_ui: v="+v+" data-key="+$(e).attr("data-key"));
	return v;
}

ui_to_model = function(e, v) {
	log("ui_to_model: v="+v+" data-key="+$(e).attr("data-key"));
	return v;
}

MVC.tie(data, model_to_ui, ui_to_model);



new_node = function() {
	var clone = tpl_node.cloneNode(true);
	var id = seq();
	$(clone).find("input").val("Node "+id);
	var $el = $(clone).find(".ins_node");
	$el.attr("data-index", id);
	$el.click(ins_node);
	//this.parentNode.appendChild(clone);
	this.parentNode.insertBefore(clone, this);
	$(clone).show();
}

ins_node = function() {
	var pos = log(this.getAttribute("data-index"));
	var clone = tpl_node.cloneNode(true);

	var id = seq();

	$(clone).find("input").val("Node "+id);

	var $el = $(clone).find(".ins_node");

	$el.attr("data-index", id);

	$el.click(ins_node);

	//this.parentNode.appendChild(clone);
	this.parentNode.insertBefore(clone, this);
	$(clone).show();
}



$(document).ready(function() {
	log("document ready");

	tpl_node = I("tpl_node");
	$(tpl_node).hide();

	$(".ins_node.at_end").click(function() {
		ins_node.call(this);
	});

});


