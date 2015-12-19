
//　商品説明表示
function products_display() {
    if(document.all.products.style.display=="inline"){document.all.products.style.display="none"}
else
{document.all.products.style.display="inline"}
}

//商品説明の表示/非表示
//function products_display(){
//	if (document.all.products.style.display == "none") {
//		document.all.products.style.display = "inline"
//	} else {
//		document.all.products.style.display = "none"
//	}
//}

  

 
var timer;
 var count;
function move_position(){

        timer = window.setInterval("move()",1);
        window.setTimeout("stop()",5000);
    
    
}

function move(){
        camera.position.x += 0.3;
        camera.position.y -= 0.05;
    
}

function stop(){
        window.clearInterval(timer);
    
}

    var shop="";
	var updateFcts	= [];
	var scene	= new THREE.Scene();
	scene.fog	= new THREE.FogExp2( 0xd0e0f0, 0.0025 );

	var renderer	= new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 3000)
	camera.position.y = 80;

	//////////////////////////////////////////////////////////////////////////////////
	//		add an object and make it move					//
	//////////////////////////////////////////////////////////////////////////////////		
	var light	= new THREE.HemisphereLight( 0xfffff0, 0x101020, 1.25 );
	light.position.set( 0.75, 1, 0.25 );
	scene.add( light );

	var material	= new THREE.MeshBasicMaterial({ color: 0x101018 })
	var geometry	= new THREE.PlaneGeometry( 2000, 2000 )
	var plane	= new THREE.Mesh( geometry, material );
	plane.rotation.x= - 90 * Math.PI / 180;
	scene.add( plane );

	//////////////////////////////////////////////////////////////////////////////////
	//		ビル群を表示するかを制御							//
	//////////////////////////////////////////////////////////////////////////////////

	var city	= new THREEx.ProceduralCity()
    

        scene.add(city);
//    if(shop == "true"){
//        scene.remove(city);
//    }

	
	
 
    
  
//3Dモデルデータの生成(※部屋の生成)
var obj,chara;    
var loader = new THREE.ObjectLoader();
loader.load("obj/bedroom1.json",function ( obj ) {
        obj.scale.set( 5, 5, 5 );
    
     // モデルをダミーオブジェクトで包む（へそ中心に回転したいため）
        chara = new THREE.Object3D();
        chara.add(obj);
    chara.position.set(60,45,-15);
    chara.rotation.y = 35;
    
    
//    if(shop == "true"){
//    scene.add(chara);
//    }  
});
    
    
//3Dモデルデータと同じ空間上に配置する「立方体」の生成
 var cube = new THREE.Mesh(
            
     new THREE.SphereGeometry(5,5,5),                          
     new THREE.MeshPhongMaterial({                                //            color: 0x990000 //球の色
         visible:false
      }));
    cube.position.set(60,50,-15);
    cube.scale.set(4,4,4);
 //sceneにcubeを追加
//    if(shop == "true"){
//      scene.add(cube);   
//    }


   
    //衝突判定
var meshs = [];
var Object = cube;
var count = 0;
meshs.push(Object);      


  
    
function obj_distance(){    
    
// camera に Raycaster を作成して下方向に ray を向ける
var ray = new THREE.Raycaster(camera.position, new THREE.Vector3(1, -1, 1));
// intersectObjects に衝突判定対象のメッシュのリストを渡す
var objs = ray.intersectObjects( meshs );

    // 例）衝突対象オブジェクトとの距離が 0 になった場合
    if( objs.length > 0 )
    {
//        var dist = objs[0].distance;
//    console.log( dist ); // 衝突判定対象までの距離
// 
//    // 例）衝突対象オブジェクトとの距離が 0 になった場合
//    if( dist <= 10 )
//    {
//    　　// やりたい処理を行う
        if(count < 1){
        products_display();
        count++;
        }
        

//    }       
  }    
}

 //////////////////////////////////////////////////////////////////////////////////
	//		Camera Controls							//
	//////////////////////////////////////////////////////////////////////////////////
	var controls	= new THREE.FirstPersonControls( camera );
	controls.movementSpeed	= 20;
	controls.lookSpeed	= 0.05;
	controls.lookVertical	= true;
	updateFcts.push(function(delta, now){
		controls.update( delta );		
	})

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	updateFcts.push(function(){
		renderer.render( scene, camera );
        obj_distance();   
        
        if(shop == "true"){
        scene.remove(city);
        scene.add(chara);
        scene.add(cube);
        camera.position.set(0,80,0);
        shop="false";
    }

	})
	
	//////////////////////////////////////////////////////////////////////////////////
	//		loop runner							//
	//////////////////////////////////////////////////////////////////////////////////
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		})
	})
    
    
  