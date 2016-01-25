

seq_count = 0;
seq = function() {
	seq_count += 1;
	return seq_count;
}


tpl_node = null;
tree = null;

data = {
	tree: [],
};

/*
model_to_ui = function(e, v) {
	log("model_to_ui: v="+v+" data-key="+$(e).attr("data-key"));
	return v;
}

ui_to_model = function(e, v) {
	log("ui_to_model: v="+v+" data-key="+$(e).attr("data-key"));
	return v;
}

MVC.tie(data, model_to_ui, ui_to_model);
*/



insert_node = function() {

	var clone = tpl_node.cloneNode(true);

	var id = seq();

	clone.id = id;
	$(clone).find("input").val("node.id="+id);
	$(clone).find(".dragpart").attr("draggable", "true");

	clone.ondragstart = function(ev) {
		ev.dataTransfer.setData("id", id);
	}

	var ins = $(clone).find(".ins_node")[0];
	ins.onclick = function(ev) {
		insert_node.call(clone, ev)
	}
	ins.ondrop = function(ev) {
		var oid = ev.dataTransfer.getData("id");
		if(oid != id) {
			log("MOVE "+oid+" before "+id);
			var mover = I(oid);
			//mover.remove();
			//var neighbor = I(id);
			//tree.insertBefore(mover, neighbor);
			$(mover).find(".dragpart").slideUp(function() {
				mover.remove();
				var neighbor = I(id);
				tree.insertBefore(mover, neighbor);
				$(mover).find(".dragpart").slideDown();
			});


		}
		else {
			//log("doing nothing");
		}
		ev.preventDefault();
	}
	ins.ondragenter = function(ev) { ev.preventDefault(); }
	ins.ondragleave = function(ev) { ev.preventDefault(); }
	ins.ondragover = function(ev) { ev.preventDefault(); }

	this.parentNode.insertBefore(clone, this);
	$(clone).slideDown();

}

$(document).ready(function() {
	log("document ready");

	tree = I("tree");

	tpl_node = I("tpl_node");
	tpl_node.id = "";
	$(tpl_node).hide();

	var ins = $(".ins_node.at_end")[0];
	ins.onclick = insert_node;
	ins.ondrop = function(ev) {
		ev.preventDefault();
		var oid = ev.dataTransfer.getData("id");
		log("MOVE "+oid+" to end");
		var mover = I(oid);
		$(mover).find(".dragpart").slideUp(function() {
			mover.remove();
			tree.insertBefore(mover, ins);
			$(mover).find(".dragpart").slideDown();
		});
	}
	ins.ondragenter = function(ev) { ev.preventDefault(); }
	ins.ondragleave = function(ev) { ev.preventDefault(); }
	ins.ondragover = function(ev) { ev.preventDefault(); }

});


