$(document).ready(function(){
	var changement=true;
	var gagner=false;
	// Initialisation du tableau de jeux
	if (typeof jeux == 'undefined'){
		var jeux=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		// var jeux=[2,2,2,16,16,8,4,2,32,64,128,256,512,0,0,0];
		ajout();
		ajout();
	}

	// Détéction clavier
	$(document).keydown(function(e) {
		changement=false;
		switch (e.which) {
			case 37:
			bouge('gauche');
			ajout();
			fin();
			break;
			case 39:
			bouge('droite');
			ajout();
			fin();
			break;
			case 38:
			bouge('haut');
			ajout();
			fin();
			break;
			case 40:
			bouge('bas');
			ajout();
			fin();
			break;
		}
	});

	//Verification fin partie
	function fin(){
		//Si on gagne
		for(i=0;i<=15;i++){
			if(jeux[i]==2048 && !gagner){
				alert('Vous avez gagnez ! Mais vous pouvez tentez de faire plus !');
				gagner=true;
			}
		}

		//Si on perd
		var perdu1=[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1];
		var perdu2=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var perdu3=[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
		var perdu4=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var perdu_total=0;
		var start_index=0;
		for(k=0;k<=3;k++){
			for(i=start_index;i<=start_index+3;i++){
				if(i!=start_index+3 && jeux[i]!=jeux[i+1] && jeux[i]!=0){
					perdu1[i]=1;
				}
			}
			start_index+=4;
		}
		for(i=0;i<=15;i++){
			if(jeux[i]!=jeux[i+4] && jeux[i]!=0){
				perdu2[i]=1;
			}
		}
		var start_index=15;
		for(k=0;k<=3;k++){
			for(i=start_index;i>=start_index-3;i--){
				if(i!=start_index-3 && jeux[i]!=jeux[i-1] && jeux[i]!=0){
					perdu3[i]=1;
				}
			}
			start_index-=4;
		}

		for(i=15;i>=0;i--){
			if(jeux[i]!=jeux[i-4] && jeux[i]!=0){
				perdu4[i]=1;
			}
		}

		for(i=0;i<=15;i++){
			if(perdu1[i]==1 && perdu2[i]==1 && perdu3[i]==1 && perdu4[i]==1)
				perdu_total+=1;
		}

		if(perdu_total>=16){
			alert('Vous avez perdu !');
		}
	}

	//Bouge les cases dans la direction indiqué
	function bouge(direction){
		if(direction=='gauche'){
			var flag=0;
			while(flag<=4){
				var start_index=15;
				for(k=1;k<=4;k++){
					for(i=start_index;i>=start_index-3;i--){
						if(i!=start_index-3 && jeux[i-1]==0 && jeux[i]!=0){
							jeux[i-1]=jeux[i];
							jeux[i]=0;
							changement=true;
						}
					}
					start_index-=4;
				}

				var start_index=0;
				for(k=1;k<=4;k++){
					for(i=start_index;i<=start_index+3;i++){
						if(i!=start_index && jeux[i-1]==jeux[i] && jeux[i]!=0){
							jeux[i-1]=jeux[i]*2;
							jeux[i]=0;
							changement=true;
						}
					}
					start_index+=4;
				}
				flag++;
			}
		}


		if(direction=='droite'){
			var flag=0;
			while(flag<=4){
				var start_index=0;
				for(k=1;k<=4;k++){
					for(i=start_index;i<=start_index+3;i++){
						if(i!=start_index+3 && jeux[i+1]==0 && jeux[i]!=0){
							jeux[i+1]=jeux[i];
							jeux[i]=0;
							changement=true;
						}
					}
					start_index+=4;
				}

				var start_index=15;
				for(k=1;k<=4;k++){
					for(i=start_index;i>=start_index-3;i--){
						if(i!=start_index && jeux[i+1]==jeux[i] && jeux[i]!=0){
							jeux[i+1]=jeux[i]*2;
							jeux[i]=0;
							changement=true;
						}
					}
					start_index-=4;
				}
				flag++;
			}
		}

		if(direction=='haut'){
			var flag=0;
			while(flag<=4){
				for(i=0;i<=15;i++){
					if((jeux[i-4])==0 && jeux[i]!=0){
						jeux[i-4]=jeux[i];
						jeux[i]=0;
						changement=true;
					}
				}

				for(i=0;i<=15;i++){
					if((jeux[i-4])==jeux[i] && jeux[i]!=0){
						jeux[i-4]=jeux[i]*2;
						jeux[i]=0;
						changement=true;
					}
				}
				flag++;
			}

		}

		if(direction=='bas'){
			var flag=0;
			while(flag<=4){
				for(i=15;i>=0;i--){
					if((jeux[i+4])==0 && jeux[i]!=0){
						jeux[i+4]=jeux[i];
						jeux[i]=0;
						changement=true;
					}
				}

				for(i=15;i>=0;i--){
					if((jeux[i+4])==jeux[i] && jeux[i]!=0){
						jeux[i+4]=jeux[i]*2;
						jeux[i]=0;
						changement=true;
					}
				}
				flag++;
			}

		}

	}

	// Ajout nombre
	function ajout(){
		if(changement){
			var case_vide=[];
			var k=0;
			for(i=0;i<=15;i++){
				if(jeux[i]==0){
					case_vide[k]=i;
					k++;
				}
			}
			var case_rand = case_vide[Math.floor(Math.random()*case_vide.length)];
			if(Math.floor((Math.random()*100)+1)>=90){
				jeux[case_rand]=4;
			}
			else{
				jeux[case_rand]=2;
			}
		}
		affiche();
	}

	// Affichage jeux
	function affiche(){
		for(i=0;i<=15;i++){
			if(jeux[i]==0){
				$('#case'+(i+1)).text('');
				$('#case'+(i+1)).removeClass().addClass('num0');
			}
			else{
				$('#case'+(i+1)).text(jeux[i]);
				$('#case'+(i+1)).removeClass().addClass('num'+jeux[i]);
			}
		}
	}
});
