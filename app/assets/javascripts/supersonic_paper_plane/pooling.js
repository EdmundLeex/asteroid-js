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
  		node.prevNode = this.last;
      this.last.nextNode = node;
  		this.last = node;
  	}

  	node.list = this; // node reference back to list
  	this.length++;
  };

  LinkedList.prototype.pop = function () {
  	if (this.length) {
	  	var node = this.last;
	  	var newLast = node.prevNode;

	  	this.last = newLast;

	  	if (newLast) {
        newLast.nextNode = null;
      } else {
        // when there was only one node
        this.first = null;
      }

	  	node.prevNode = null;
	  	this.length--;

	  	node.list = null; // remove reference to list

	  	return node;
	  } else {
	  	return null;
	  }
  };

  LinkedList.prototype.unshift = function (node) {
    if (node.list) throw "Node is part of a list. Can't add it to another list.";

    if (!this.length) {
      this.first = node;
      this.last = node;
      node.prevNode = null;
      node.nextNode = null;
    } else {
      node.nextNode = this.first;
      this.first.prevNode = node;
      this.first = node;
    }

    node.list = this;
    this.length++;
  }

  LinkedList.prototype.each = function (callback) {
  	if (this.first) {
      if (typeof this.first === 'undefined') debugger;
  		var currentNode = this.first;

  		while (currentNode && typeof currentNode !== 'undefined') {
  			var nextNode = currentNode.nextNode
  			callback(currentNode);
  			currentNode = nextNode;
  		}
  	}
  };

  LinkedList.prototype.remove = function (node) {
  	if (node.list !== this) {
      // node.draw
      debugger
    }
    // draw a red dot on the screen

  	var newPrev = node.prevNode;
  	var newNext = node.nextNode;

  	if (newPrev && newNext) {
  		newPrev.nextNode = newNext;
  		newNext.prevNode = newPrev;
  	} else if (newPrev && !newNext) {
      // remove last node
  		newPrev.nextNode = null;
  		this.last = newPrev;
  	} else if (!newPrev && newNext) {
      // remove first node
  		newNext.prevNode = null;
  		this.first = newNext;
  	} else if (!newPrev && !newNext) {
      // remove the only node
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