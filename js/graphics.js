
var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;
var FLOOR = -5;

var Graphics;

function render(){
    if (Graphics == null){
        Graphics = new SiteGraphics();
    }
    
    requestAnimationFrame(render);
    Graphics.renderer.render(Graphics.scene,Graphics.camera);
}

function SiteGraphics(domElement,width,height){
    //Setup variables
    this.init(domElement,width,height);
    
}

SiteGraphics.prototype.init = function(domElement,width,height){
    this.scene = new THREE.Scene();

    //Fog
    this.scene.fog = new THREE.Fog( 0x59472b, 50, 200 );
    
    //Renderer
    this.renderer = new THREE.WebGLRenderer(); 
    console.log(width,height);
    this.renderer.setSize(width,height); 
    domElement.appendChild(this.renderer.domElement); 
    this.renderer.setClearColor(this.scene.fog.color, 1 );
    this.renderer.autoClear = false;
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;  
    
    this.initCamera();
    this.initGround();
    this.initLights();
}

SiteGraphics.prototype.tweenCamera = function(destination,lookat,duration){
    //Old values
    var movementFrom = this.camera.position;
    var cameraFrom = this.camera.target;
    //Tweens
    var movementTween = new TWEEN.Tween(this.camera.position).to(destination, duration).easing( TWEEN.Easing.Quadratic.InOut );
    var cameraTween = new TWEEN.Tween(this.camera.target).to(lookat,duration).easing(TWEEN.Easing.Quadratic.InOut);
    
    var cameraRef = this.camera
    
    movementTween.onUpdate(function(){
        cameraRef.position = movementFrom;
        //cameraRef.updateProjectionMatrix();
    });
    
    cameraTween.onUpdate(function(){
       cameraRef.lookAt(cameraFrom); 
    });
    movementTween.start();
    cameraTween.start();
    
}



SiteGraphics.prototype.initCamera = function(){
    //Camera
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 300 );
    this.camera.position.set(20, 20, 20 );
    this.camera.target = new THREE.Vector3( 0, 0, 0 )  
    this.camera.lookAt( this.camera.target );
    this.camera.lookAt(new THREE.Vector3(0,0,0));
    this.camera.updateProjectionMatrix();
}

SiteGraphics.prototype.initLights = function(){  
        //Lights
        var directionalLight = new THREE.DirectionalLight( 0x404040,3);
        directionalLight.position.set(25,20,50);
        //directionalLight.position.normalize();
        
        directionalLight.castShadow = true;
        directionalLight.shadowCameraRight     =  15;
        directionalLight.shadowCameraLeft     = -15;
        directionalLight.shadowCameraTop      =  15;
        directionalLight.shadowCameraBottom   = -15;
        directionalLight.shadowDarkness = 0.7;
        this.scene.add( directionalLight );
    
        var ambient = new THREE.AmbientLight( 0x444444,3 );
        this.scene.add( ambient );
        

}

SiteGraphics.prototype.initGround = function(){
     // GROUND
    var geometry = new THREE.PlaneGeometry( 100, 100 );
    var planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffdd99 } );
    planeMaterial.ambient = planeMaterial.color;

    var ground = new THREE.Mesh( geometry, planeMaterial );
    ground.position.set( 0, FLOOR, 0 );
    ground.rotation.x = - Math.PI / 2;
    ground.scale.set( 100, 100, 100 );
    ground.castShadow = false;
    ground.receiveShadow = true;

    this.scene.add( ground );

}

SiteGraphics.prototype.addAxisHelper = function(){        
        var axisHelper = new THREE.AxisHelper( 20 ); 
        axisHelper.position.set(0,0,0);
        this.scene.add( axisHelper );
}

SiteGraphics.prototype.addCube = function(pos){  
        var geometry = new THREE.BoxGeometry(10,10,10);
        var material = new THREE.MeshPhongMaterial(  { shininess: 50, ambient: 0x444444, color: 0xff4040, specular: 0x303030 });
        var cube = new THREE.Mesh(geometry, material); 
        cube.position.set(pos.x,pos.y,pos.z);
        cube.castShadow = true;
        cube.receiveShadow = true;
        this.scene.add(cube);    
        return cube;
}

SiteGraphics.prototype.addSphere = function(pos){
        var geometry = new THREE.SphereGeometry(5,32,32);
        var material = new THREE.MeshPhongMaterial(  { shininess: 50, ambient: 0x444444, color: 0x4040ff, specular: 0x404040 });
        var sphere = new THREE.Mesh(geometry,material);
        sphere.position.set(pos.x,pos.y,pos.z);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        this.scene.add(sphere);
        return sphere;
}
