if (typeof(Collection) == "undefined")
	Collection = {};
	
Collection.Entry = function(v) {
	this.previous 	= null;
	this.value 		= v;
	this.next 		= null;
};

Collection.Entry.prototype = {
	destroy: function() {
		this.previous = null;
		delete this.previous;
		
		this.value = null;
		delete this.value;
		
		this.next = null;
		delete this.next;
	}
};

// Collection.LinkedList
// ---------------------

Collection.LinkedList = {};
Collection.LinkedList = function() {
	this.first = null;
	this.last = null;
	this.size = 0;
};

Collection.LinkedList.prototype = {
	add: function(o) {
		this._addLast(o);
	},
	addAt: function(index, o) {
		this._checkBoundsInclusive(index);
		
		if (index < this.size) {
			var e = new Collection.Entry(o);
			var after = this._getEntry(index);
			e.next = after;
			e.previous = after.previous;
			if (after.previous == null)
				this.first = e;
			else
				after.previous.next = e;
			after.previous = e;
			++this.size;
		}
		else
			this._addLast(o);
	},
	addFirst: function(o) {
		var e = new Collection.Entry(o);
		if (this.size == 0)
			this.first = this.last = e;
		else {
			e.next = this.first;
			this.first.previous = e;
			this.first = e;
		}
	},
	get: function(index) {
		this._checkBoundsExclusive(index);
		return this._getEntry(index).value;
	},
	getFirst: function() {
		if (this.size == 0)
			throw new Error("List is empty");
		return this.first;
	},
	getLast: function() {
		if (this.size == 0)
			throw new Error("List is empty");
		return this.last;
	},
	indexOf: function(elem) {
		var index = 0;
		var e = this.first;
		while (e != null) {
			if (e.value === elem)
				return index;
			++index;
			e = e.next;
		}
		return -1;
	},
	lastIndexOf: function(elem) {
		var index = this.size - 1;
		var e = this.last;
		while (e != null) {
			if (e.value === elem)
				return index;
			--index;
			e = e.previous;			
		}
		return -1;
	},
	contains: function(elem) {
		return (this.indexOf(elem) != -1);
	},
	isEmpty: function() {
		return (this.size <= 0);
	},
	toArray: function() {
		var array = new Array();
		var e = this.first;
		for (var i = 0; i < this.size; ++i) {
			array[i] = e.value;
			e = e.next;
		}
		return array;
	},
	
	// Internal Implementations
  	// ------------------------
	
	_getEntry: function(n) {
		var e;
		if (n < this.size/2) {
			e = this.first;
			while (n-- > 0)
				e = e.next;
		} else {
			e = this.last;
			while (n++ < this.size)
				e = e.previous;
		}
	
		return e;
	},
	_checkBoundsExclusive: function(index) {
		if (index < 0 || index >= this.size)
			throw new Error("Index " + index + " is out of bounds [0," + this.size + "]");
	},
	_checkBoundsInclusive: function(index) {
		if (index < 0 || index > this.size)
			throw new Error("Index " + index + " is out of bounds [0," + this.size + "]");
	},
	_addLast: function(o) {
		var e = new Collection.Entry(o);
		if (this.size == 0)
			this.first = this.last = e;
		else {
			e.previous = this.last;
			this.last.next = e;
			this.last = e;
		}
		++this.size;
	}
};
