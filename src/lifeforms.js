var LifeForms = (function(window, document, undefined){
	
	var field, randomBtn, playBtn, running,
		cols = 37,
		rows = 25;
	
	function $(id){
		
		return document.getElementById(id);
	}
	
	function $$(selector){
		
		return document.querySelectorAll(selector);
	}
	
	function createField(cols, rows){
		
		var i, html = '';

		for(i = 0; i < rows; i++){
			
			html += '<p>'+Array(cols).join('<input type="checkbox">')+'</p>';
		}

		field.innerHTML += html;
	}
	
	
	function getNeighbours(el, col, row){
			
		var count = 0;
		
		if(el.previousElementSibling.checked){
			
			count++;
		}
		if(el.nextElementSibling.checked){
			
			count++;
		}
		
		var parent = el.parentElement.previousElementSibling;
		
		if(parent.children[col].checked){
			
			
		}
		
		if(parent.children[col-1].checked){
			
			count++
		}
		
		if(parent.children[col+1].checked){
			
			count++;
		}		
		
	}
	
	function updateCell(el){
		
		
		el['data-neighbours'] === '1'){
			
			el.checked = true;
		}else{
			
			delete el.checked;
		}
	}
	
	function loop(){
		
		var i, j,
			cellCount = cells.length;
		
		for(j = 0; j < rows; j++){
			
			for(i = 0; i < cols; i++){
				
				updateCell(cells[i+j*cols], i, j);
			}
			
		}
		
		
			
		for(i = 0; i < cellCount; i++){
			
			stepCell(cells[i]);
			
		}
		
		running && setTimeout(loop, 200);
	}
	
	function init(ruleset){
		
		
		field = $('field');
		cells = $$('#field input');
		randomBtn = $('random');
		playBtn = $('play');
		
		running = true;
		
		createField(cols, rows);
		
		playBtn.addEventListener('click', function(e){
			
			e.preventDefault();
			
			running = !running;
			this.innerHTML = running ? 'pause' : 'play';
				
			if(running){
				
				loop();
			}
			
		}, false)
		
		
	}
	
	
	
	return {
		
		init: init		
	};
	
})(window, document);


