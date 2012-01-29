var FormOfLife = (function(){
	
	
	function proxy(context, f){
		
		return function(){
			
			f.apply(context, arguments);	
		}
	}
	
	var Life = function(id, cols, rows, rules){
		
		this.cols = cols;
		this.rows = rows;
		this.el = document.getElementById(id);
		this.setRules(rules);
		this.createField(cols, rows);
		this.running = true;
		this.delay = 500;
		this.loop();
	}
	
	Life.prototype = {
		
		setRules: function(rules){
			
			console.log(rules);
			
			if(rules && rules.indexOf('/') !== -1){
				
				this.rules = rules.split('/')
			}else{
				this.rules = ['23', '3'];
			}
			
			console.log(this.rules);
			
		},
		
		createField : function(cols, rows){
			
			var i, html = '';

			for(i = 0; i < rows; i++){
				
				html += '<p>'+Array(cols).join('<input type="checkbox">')+'</p>';
			}
			this.el.innerHTML = html;			
		},
		
		forEach: function(f){
			
			var i, currentCell,
				rows = this.rows;
				currentRow = this.el.firstChild;
			
			do{
				currentCell = currentRow.firstChild;
				i = 0;
				do{
				
					f.call(this, currentCell, i);
					i++;	
					
				}while(currentCell = currentCell.nextSibling);
			}while(currentRow = currentRow.nextSibling);
		},
		
		_random: function(cell){
			
			cell.checked = Math.random() < 0.2 ? true : false;	
		},
		
		_calculateCell: function(cell, n){
			
			var nodes, i, l, count;
				parentN = cell.parentNode,
				above = parentN.previousSibling,
				below = parentN.nextSibling,
				cells = [cell.nextSibling, cell.previousSibling];
			
			
			if(above){
				nodes = above.childNodes;
				
				if(n > 0){
				
					cells.push(nodes[n-1]);
				}
				cells.push(nodes[n], nodes[n+1]);
				
			}
			
			if(below){
				nodes = below.childNodes;
				
				if(n > 0){
				
					cells.push(nodes[n-1]);
				}
				cells.push(nodes[n], nodes[n+1]);
			}
			
			count = 0;
			l = cells.length;
			
		
			for(i = 0; i < l; i++){
				if(cells[i] && cells[i].checked){
					count++;
				}
			}

			
			cell.setAttribute('data-count',  count);
			
		},
		
		_updateCell: function(cell){
			
			var count = cell.getAttribute('data-count'),
				rules = this.rules;
			
			if(rules[0].indexOf(count) === -1){
				
				cell.checked = false;
				
			}else if(rules[1].indexOf(count) !== -1){
				
				cell.checked = true;
			}
		},
		
		randomize: function(){
			
			this.forEach(this._random);
		},
		
		loop: function(){
			
			if(this.running === true){
			
			
				this.forEach(this._calculateCell);
				this.forEach(this._updateCell);
				
				setTimeout(proxy(this, this.loop), this.delay);
			}
		},
		
		setDelay: function(delay){
			
			this.delay = parseInt(delay);
			
		},
		
		run: function(){
			
			if(!this.running){
				
				this.running = true;
				this.loop();
			}
		},
		
		pause: function(){
			
			this.running = false;
		}
	}
	
	
	
	
	return Life;
	
})();
