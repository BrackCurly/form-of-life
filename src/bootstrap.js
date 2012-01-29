(function(window, document, undefined){	
	
	function $(id){
		
		return document.getElementById(id);
	}
	
	function addEvent(target, type, handler){
		
		if(target.addEventListener){
			
			target.addEventListener(type, handler, false);
		}else{
			
			target.attachEvent('on' + type, function(e){
				
				return handler.call(target, event);
			});
		}
	}
	
	addEvent(window, 'load', function(){
				
				
			var life = new FormOfLife('field', 37, 25);
			
			
			life.randomize();
			
			addEvent($('random'), 'click', function(e){
				
				e.preventDefault();
				life.randomize();
				return false;
				
			});
			
			addEvent($('play'), 'click', function(e){
				
				e.preventDefault();
				
				if(life.running){
					
					life.pause();
					this.innerHTML = 'play';
				}else{
					
					life.run();
					this.innerHTML = 'pause';
				}
				
				return false;
			});
			
			addEvent($('speed'), 'change', function(e){
				
				life.setDelay(this.value);
				
			});
			
			addEvent($('ruleset'), 'change', function(e){
				
				console.log(this.value);
				
				life.setRules(this.value);
				
			});
			
			
	});
			
})(window, document);
