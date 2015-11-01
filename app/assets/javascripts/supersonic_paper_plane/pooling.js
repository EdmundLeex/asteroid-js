(function(root){
	if (typeof root.SupersonicPaperPlane === 'undefined') {
    root.SupersonicPaperPlane = {};
  }

  var LinkedListNode = SupersonicPaperPlane.LinkedListNode = function () {
  	this.nextNode = null;
  	this.prevNode = null;
  	this.list = null;
  };

  var LinkedList = SupersonicPaperPlane.LinkedList = function () {
  	this.first = null;
  	this.last = null;
  	this.length = 0;
  };

  LinkedList.prototype.push = function (node) {
		if (node.list) throw "Node is part of a list. Can't add it to another list.";

  	if (!this.length) {
  		this.first = node;
  		this.last = node;
  		node.prevNode = null;
  		node.nextNode = null;
  	} else {
  		this.last.nextNode = node;
  		node.prevNode = this.last;
  		this.last = node;
  	}

  	node.list = this; // node reference back to list
  	this.length++;
  };

  LinkedList.prototype.pop = function () {
  	if (this.length) {
	  	var node = this.last;
	  	var prevNode = node.prevNode;

	  	this.last = prevNode;
	  	if (prevNode) prevNode.nextNode = null;
	  	node.prevNode = null;
	  	this.length--;

	  	node.list = null; // remove reference to list

	  	return node;
	  } else {
	  	return null;
	  }
  };

  LinkedList.prototype.each = function (callback) {
  	if (this.first) {
  		var currentNode = this.first;

  		while (currentNode) {
  			var nextNode = currentNode.nextNode
  			callback(currentNode);
  			currentNode = nextNode;
  		}
  	}
  };

  LinkedList.prototype.remove = function (node) {
  	if (node.list !== this) throw "node doesn't belongs to list.";

  	var prevNode = node.prevNode;
  	var nextNode = node.nextNode;

  	if (prevNode && nextNode) {
  		prevNode.nextNode = nextNode;
  		nextNode.prevNode = prevNode;
  	} else if (prevNode && !nextNode) {
  		prevNode.nextNode = nextNode;
  		this.last = prevNode;
  	} else if (!prevNode && nextNode) {
  		nextNode.prevNode = null;
  		this.first = nextNode;
  	} else if (!prevNode && !nextNode) {
  		this.first = null;
  		this.last = null;
  	} else {
  		debugger;
  	}

  	// detach node
  	node.prevNode = null;
  	node.nextNode = null;
  	node.list = null;

  	this.length--;
  };
})(this);