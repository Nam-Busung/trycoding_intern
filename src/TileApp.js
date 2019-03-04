import React, { Component } from 'react';
import Phaser from 'phaser';
import ground_1x1 from './ground_1x1.png';
import obj from './obj.png';
import loop from './drone1.1.png';
import snake from './prop.1.2.png';

let map;
let marker;
let showLayersKey;
let layer1Key;
let layer2Key;
let layer3Key;
let layer4Key;
let cursors;
let bmd;
let obj_map;

export let testing;
export let mission_send;
class TileApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      flag_:1,
      game: new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: this.preload, create: this.create, update: this.update }),
      currentTile: 0,
      text: 0,
      currentLayer: 1,
      flag: 1,
      loop: 0,
      layer3: 3,
      layer1: 1,
      layer2: 2,
      layer4: 4,
      sprite: 0,
      currentProp: 0,
      save_file: 0,
      save_object: [],
      save_tiles: [],
      save_props: [],
      save_mission: [],
      mission_cnt: 0,
      object_cnt: 0,
      tile1_cnt: 0,
      tile2_cnt: 0,
      prop_cnt: 0,
      save_object_x: [],
      save_object_y: [],
      save_tile_x:[],
      save_tile_y:[],
      save_prop_x:[],
      save_prop_y:[],
      save_prop_x_inner:[],
      save_prop_y_inner:[],
      select_mission: 0,
      currentMission:0,
      tile_image: 0,
      prop_image: 0,
      prop_x: 0,
      prop_y: 0
    };
    this.make_json = this.make_json.bind(this);
    this.make_mission=this.make_mission.bind(this);
    testing = () => {this.make_json()};
    mission_send = (e) =>{this.make_mission(e)};
  }

  /**
   * phaser camera function
   */
  update = () => {

    if (cursors.left.isDown) {
      this.state.game.camera.x -= 4;
    }
    else if (cursors.right.isDown) {
      this.state.game.camera.x += 4;
    }
    if (cursors.up.isDown) {
      this.state.game.camera.y -= 4;
    }
    else if (cursors.down.isDown) {
      this.state.game.camera.y += 4;
    }
  }

  /**
   * 이미지파일 preload
   */
  preload = () => {
    this.state.game.load.image('ground_1x1', ground_1x1);
    this.state.game.load.image('obj', obj);
    this.state.game.load.image('loop', loop);
    this.state.game.load.image('snake', snake);
  }

  /**
   * prop copy 기능
   */
  paint = (pointer, x, y) => {
    if (this.props.currentTile!==24) {
      this.state.prop_x = x;
      this.state.prop_y = y;
      if (this.state.currentLayer === this.state.layer3 && pointer.isDown && this.state.flag) {
        console.log(this.props.currentProp);
        switch (this.props.currentProp) {
          case 0:
            this.state.sprite = this.state.layer3.create(x, y, 'loop');//currentProp변수 이용 switch case 문
            this.state.sprite.anchor.set(0.5);
            this.state.sprite.inputEnabled = true;
            this.state.sprite.input.useHandCursor = true;
            this.state.sprite.events.onInputDown.add(this.destroySprite, this);
            this.state.flag = 0;
            break;

          case 1:
            this.state.sprite = this.state.layer3.create(x, y, 'snake');//currentProp변수 이용 switch case 문
            this.state.sprite.anchor.set(0.5);
            this.state.sprite.inputEnabled = true;
            this.state.sprite.input.useHandCursor = true;
            this.state.sprite.events.onInputDown.add(this.destroySprite, this);
            this.state.flag = 0;
            break;
        }
        this.make_props();
      }
      if (this.state.currentLayer === this.state.layer3 && pointer.isUp) {
        this.state.flag = 1;
      }
    }
  }


  /**
   * 초기 선언 함수, 배경 선언 및 각 Layer별 키보드 배정, 키보드를 이용한 이동 기능 부여
   *     this.set_props(); 프롭 초기설정
   *     this.set_tile(); 타일 초기설정
   *     layer1.resizeWorld();
   */
  create = () => {
 
    this.set_props();
    this.set_tile();
    
    cursors = this.state.game.input.keyboard.createCursorKeys();

    this.state.loop = this.state.game.make.sprite(0, 0, 'loop');
    // this.state.loop.anchor.set(100);

    bmd = this.state.game.add.bitmapData(this.state.game.width, this.state.game.height);

    bmd.smoothed = false;
    this.state.game.input.addMoveCallback(this.paint, this);

    this.state.game.stage.backgroundColor = '#2d2d2d'
    map = this.state.game.add.tilemap();
    obj_map = this.state.game.add.tilemap();
    //  Add a Tileset image to the map
    obj_map.addTilesetImage('obj');
    map.addTilesetImage('ground_1x1');
    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
    this.state.layer1 = map.create('level1', 40, 30, 32, 32);
    //  Resize the world
    this.state.layer1.resizeWorld();
    this.state.layer2 = map.createBlankLayer('level2', 40, 30, 32, 32);
    this.state.layer3 = this.state.game.add.group();
    this.state.layer4 = obj_map.create('Game obj', 40, 30, 32, 32);

    this.state.currentLayer = this.state.layer1;
    //  Create our tile selector at the top of the screen
    this.createMarker();
    this.state.game.input.addMoveCallback(this.updateMarker, this);
    showLayersKey = this.state.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    layer1Key = this.state.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    layer2Key = this.state.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    layer3Key = this.state.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    layer4Key = this.state.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    showLayersKey.onDown.add(this.changeLayer, this);
    layer1Key.onDown.add(this.changeLayer, this);
    layer2Key.onDown.add(this.changeLayer, this);
    layer3Key.onDown.add(this.changeLayer, this);
    layer4Key.onDown.add(this.changeLayer, this);
    console.log(this.state.layer1.index);
    console.log(this.state.layer2.index);
    console.log(this.state.layer3.index);
    console.log(this.state.layer4.index);
    this.creates();
  }

  /**
   * 현재 Layer 화면 표출
   */
  creates = () => {
    var style = { font: "20px Arial", fill: "#fff", align: "center" };
    this.setState({
      text: this.state.game.add.text(0, 500, 'Current Layer:' + this.state.currentLayer.name + '\n 1-4 Switch Layers. SPACE = Show All. ', style)
    })
  }

  /**
   * Layer 변경시 text 업데이트
   */
  updateText = () => {
    this.state.text.setText('Current Layer:' + this.state.currentLayer.name + '\n 1-4 Switch Layers. SPACE = Show All. ');
  }

/**
 * prop Layer 변경시 text 업데이트
 */
  update_prop = () => {
    this.state.text.setText('Current Layer:prop\n 1-4 Switch Layers. SPACE = Show All. ');
  }


  /**
   * 마커 부분에 타일 카피 기능부여
   */
  updateMarker = () => {
    if (this.state.currentLayer !== this.state.layer3) {
      marker.x = this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX) * 32;
      marker.y = this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY) * 32;
      if (this.state.game.input.mousePointer.isDown) {

        switch (this.state.currentLayer) {

          case this.state.layer1:
            if (this.props.currentTile !== 24) {
              for (let i = 0; i < this.state.tile1_cnt; i++)//삭제
              {
                if (this.state.save_tile_x[i] === this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX) && this.state.save_tile_y[i] === this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)) {
                  this.state.save_tiles.splice(i, 1);
                  this.state.save_tile_x.splice(i, 1);
                  this.state.save_tile_y.splice(i, 1);
                  this.state.tile1_cnt--;
                  this.state.tile2_cnt--;
                  
                }
              }
              map.putTile(this.props.currentTile, this.state.currentLayer.getTileX(marker.x), this.state.currentLayer.getTileY(marker.y), this.state.currentLayer);
              this.make_tiles();
            }
            else if (this.props.currentTile === 24) {
              for (let i = 0; i < this.state.tile1_cnt; i++)//삭제
              {
                if (this.state.save_tile_x[i] === this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX) && this.state.save_tile_y[i] === this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)) {
                  this.state.save_tiles.splice(i, 1);
                  this.state.save_tile_x.splice(i, 1);
                  this.state.save_tile_y.splice(i, 1);
                  this.state.tile1_cnt--;
                  this.state.tile2_cnt--;
                }
              }
              map.putTile(this.props.currentTile, this.state.currentLayer.getTileX(marker.x), this.state.currentLayer.getTileY(marker.y), this.state.currentLayer);
            }
            break;

          case this.state.layer2:
              if (this.props.currentTile !== 24) {
                for (let i = this.state.tile1_cnt; i < this.state.tile2_cnt; i++)//삭제
                {
                  if (this.state.save_tile_x[i] === this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX) && this.state.save_tile_y[i] === this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)) {
                    this.state.save_tiles.splice(i, 1);
                    this.state.save_tile_x.splice(i, 1);
                    this.state.save_tile_y.splice(i, 1);
                    this.state.tile2_cnt--;
                  }
                }
                map.putTile(this.props.currentTile, this.state.currentLayer.getTileX(marker.x), this.state.currentLayer.getTileY(marker.y), this.state.currentLayer);
                this.make_tiles();
              }
              else if (this.props.currentTile === 24) {
                for (let i = this.state.tile1_cnt; i < this.state.tile2_cnt; i++)//삭제
                {
                  if (this.state.save_tile_x[i] === this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX) && this.state.save_tile_y[i] === this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)) {
                    this.state.save_tiles.splice(i, 1);
                    this.state.save_tile_x.splice(i, 1);
                    this.state.save_tile_y.splice(i, 1);
                    this.state.tile2_cnt--;
                  }
                }
                map.putTile(this.props.currentTile, this.state.currentLayer.getTileX(marker.x), this.state.currentLayer.getTileY(marker.y), this.state.currentLayer);
              }
            break;

          case this.state.layer4:

            if (this.props.currentTile !== 24) {
              for (let i = 0; i < this.state.object_cnt; i++)//삭제
              {
                if (this.state.save_object_x[i] === this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX) && this.state.save_object_y[i] === this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)) {
                  this.state.save_object.splice(i, 1);
                  this.state.save_object_x.splice(i, 1);
                  this.state.save_object_y.splice(i, 1);
                  this.state.object_cnt--;
                }
              }
              obj_map.putTile(this.props.currentTile, this.state.currentLayer.getTileX(marker.x), this.state.currentLayer.getTileY(marker.y), this.state.currentLayer);
              this.make_object();
            }
            else if (this.props.currentTile === 24) {
              for (let i = 0; i < this.state.object_cnt; i++)//삭제
              {
                if (this.state.save_object_x[i] === this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX) && this.state.save_object_y[i] === this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)) {
                  this.state.save_object.splice(i, 1);
                  this.state.save_object_x.splice(i, 1);
                  this.state.save_object_y.splice(i, 1);
                  this.state.object_cnt--;
                }
              }
              obj_map.putTile(this.props.currentTile, this.state.currentLayer.getTileX(marker.x), this.state.currentLayer.getTileY(marker.y), this.state.currentLayer);
            }
          break;
        }
      }
    }
  }


/**
 * 마커 선언
 */
createMarker = () => {
  marker = this.state.game.add.graphics();
  marker.lineStyle(2, 0x000000, 1);
  marker.drawRect(0, 0, 32, 32);
}


/**
 * 키보드를 이용한 Layer 변환 시 타 Layer 투명도 변화 설정
 */



changeLayer = (key) => {
  switch (key.keyCode) {
    case Phaser.Keyboard.SPACEBAR:
    this.state.layer1.alpha = 1;
    this.state.layer2.alpha = 1;
      this.state.layer3.alpha = 1;
      this.state.layer4.alpha = 0.2;
      break;

    case Phaser.Keyboard.ONE:
      this.state.currentLayer = this.state.layer1;
      this.state.layer1.alpha = 1;
      this.state.layer2.alpha = 0.2;
      this.state.layer3.alpha = 0.2;
      this.state.layer4.alpha = 0.2;
      this.updateText();
      break;

    case Phaser.Keyboard.TWO:
      this.state.currentLayer = this.state.layer2;
      this.state.layer1.alpha = 0.2;
      this.state.layer2.alpha = 1;
      this.state.layer3.alpha = 0.2;
      this.state.layer4.alpha = 0.2;
      this.updateText();
      break;


    case Phaser.Keyboard.THREE:
      this.state.currentLayer = this.state.layer3;
      this.state.layer1.alpha = 1;
      this.state.layer2.alpha = 1;
      this.state.layer3.alpha = 1;
      this.state.layer4.alpha = 0.2;
      this.update_prop();
      break;

    case Phaser.Keyboard.FOUR:
      this.state.currentLayer = this.state.layer4;
      this.state.layer1.alpha = 1;
      this.state.layer2.alpha = 1;
      this.state.layer3.alpha = 1;
      this.state.layer4.alpha = 0.2;
      this.updateText();
      break;
  }
}


/**
 * currenttile을 0으로 설정
 */
send_num = () => {
  this.setState({
    currentTile: 0
  })
}

/**
 * currenttile을 1로 설정
 */
// send_num2 = () => {
//   this.setState({
//     currentTile: 1
//   })
// }

/**
 * currenttile을 24로 설정
 */
// send_num3 = () => {
//   this.setState({
//     currentTile: 24
//   })
// }

/**
 * erase 변수를 1로 설정
 */
// set_eraser = () => {
//   this.state.erase = 1;
// }

/**
 * prop 삭제 함수
 */
destroySprite = (sprite) => {
  if (this.state.currentLayer === this.state.layer3) {
    if(this.props.currentTile===24){
      for (let i = 0; i < this.state.prop_cnt; i++)//삭제
      {
        if (sprite.x/32 === (this.state.save_prop_x[i]+this.state.save_prop_x_inner[i]) && sprite.y/32 === (this.state.save_prop_y[i]+this.state.save_prop_y_inner[i])) {
          this.state.save_props.splice(i, 1);
          this.state.save_prop_x.splice(i, 1);
          this.state.save_prop_y.splice(i, 1);
          this.state.save_prop_x_inner.splice(i, 1);
          this.state.save_prop_y_inner.splice(i, 1);
          this.state.prop_cnt--;
        }
      }
     sprite.destroy();
    }
  }
}

/**
 * erase변수 0, currentprop변수 0으로 설정
 */
// prop1 = () => {
//   this.state.erase = 0;
//   this.props.currentProp = 0;
// }

/**
 * erase변수 0, currentprop변수 1으로 설정
 */
// prop2 = () => {
//   this.state.erase = 0;
//   this.props.currentProp = 1;
// }


/**
 * object JSON 양식 배열 저장
 */
make_object = () => {
  this.state.save_object[this.state.object_cnt] = {

    "_id": "",
    "objectType": this.props.currentTile,//자료 참고하여 spritesheet 제작
    "size": {
      "x": 1,
      "y": 1
    },
    "pivot": {
      "x": 0,
      "y": 0
    },
    "dimensions": {
      "x": 256,
      "y": 256
    },
    "colliderOffset": {
      "x": 0,
      "y": 0
    },
    "collider": {
      "x": 256,
      "y": 256
    },
    "position": {
      "x": this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX),
      "y": this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)
    }
  }
  this.state.save_object_x[this.state.object_cnt] = this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX);
  this.state.save_object_y[this.state.object_cnt] = this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY);
  this.state.object_cnt++;
}

/**
 * currentTile에 따른 tile_image 배정
 */
set_tile = () => {
  switch (this.props.currentTile) {
    case 0:
      this.state.tile_image = "1.0.0.0.10";
      break;

    case 1:
      this.state.tile_image = "";
      break;

    case 2:
      this.state.tile_image = "";
      break;

    case 3:
      this.state.tile_image = "";
      break;

    case 4:
      this.state.tile_image = "";
      break;

    case 5:
      this.state.tile_image = "";
      break;

    case 6:
      this.state.tile_image = "";
      break;

    case 7:
      this.state.tile_image = "";
      break;

    case 8:
      this.state.tile_image = "";
      break;

    case 9:
      this.state.tile_image = "";
      break;

  }
}

/**
 * currentTile에 따른 prop_image 배정
 */
set_props = () => {
  switch (this.props.currentTile) {
    case 0:
      this.state.prop_image = "1.12";
      break;

    case 1:
      this.state.prop_image = "";
      break;

    case 2:
      this.state.prop_image = "";
      break;

    case 3:
      this.state.prop_image = "";
      break;

    case 4:
      this.state.prop_image = "";
      break;

    case 5:
      this.state.prop_image = "";
      break;

    case 6:
      this.state.prop_image = "";
      break;

    case 7:
      this.state.prop_image = "";
      break;

    case 8:
      this.state.prop_image = "";
      break;

    case 9:
      this.state.prop_image = "";
      break;

  }
}

/**
 * currentTile에 따른 tile_image 배정
 */
make_tiles = () => {
  let tile_temp;
  this.set_tile();
  switch (this.state.currentLayer) {
    case this.state.layer1:
      tile_temp =
        {
          "_id": "",
          "tile": this.state.tile_image,
          "innerPosition": {
            "x": 0,
            "y": 0
          },
          "position": {
            "x": this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX),
            "y": this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)
          }

        }
      this.state.save_tiles.splice(this.state.tile1_cnt, 0, tile_temp);
      this.state.save_tile_x.splice(this.state.tile1_cnt,0,this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX));
      this.state.save_tile_y.splice(this.state.tile1_cnt,0,this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY));
      this.state.tile1_cnt++;
      this.state.tile2_cnt++;
      break;

    case this.state.layer2:
      this.state.save_tiles[this.state.tile2_cnt] =
        {
          "_id": "",
          "tile": this.state.tile_image,
          "innerPosition": {
            "x": 0,
            "y": 0
          },
          "position": {
            "x": this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX),
            "y": this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY)
          }
        }
        this.state.save_tile_x[this.state.tile2_cnt] = this.state.currentLayer.getTileX(this.state.game.input.activePointer.worldX);
        this.state.save_tile_y[this.state.tile2_cnt] = this.state.currentLayer.getTileY(this.state.game.input.activePointer.worldY);
      this.state.tile2_cnt++;
      break;
  }
}

/**
props JSON 양식 배열 저장
*/
make_props = () => {
  this.set_props();
  this.state.save_props[this.state.prop_cnt] =
    {
      "_id": "",
      "tile": this.state.prop_image,
      "innerPosition": {
        "x": (this.state.prop_x / 32) - parseInt(this.state.prop_x / 32),
        "y": (this.state.prop_y / 32) - parseInt(this.state.prop_y / 32)
      },
      "position": {
        "x": parseInt(this.state.prop_x / 32),
        "y": parseInt(this.state.prop_y / 32)
      }
    }
  this.state.save_prop_x_inner[this.state.prop_cnt]=parseFloat(this.state.prop_x / 32) - parseInt(this.state.prop_x / 32);
  this.state.save_prop_y_inner[this.state.prop_cnt]=parseFloat(this.state.prop_y / 32) - parseInt(this.state.prop_y / 32);
  this.state.save_prop_x[this.state.prop_cnt]=parseInt(this.state.prop_x / 32);
  this.state.save_prop_y[this.state.prop_cnt]=parseInt(this.state.prop_y / 32);
  this.state.prop_cnt++;
}

/**
mission JSON 양식 배열 저장
*/
make_mission = (e) => {
  switch (e) {
    case 0:
      for(let i=0;i<8;i++)
      {
        if(this.state.save_mission[i]==="Exit"){
            this.state.save_mission.splice(i, 1);
            this.state.mission_cnt--;
            this.state.flag_=0;
            console.log('erased');
        }
      }
      if(this.state.flag_)
      {
        this.state.save_mission[this.state.mission_cnt] = "Exit";
        this.state.mission_cnt++;
      }
      this.state.flag_=1;
      
      break;

    case 1:
    for(let i=0;i<8;i++)
    {
      if(this.state.save_mission[i]==="Rescue"){
          this.state.save_mission.splice(i, 1);
          this.state.mission_cnt--;
          this.state.flag_=0;
          console.log('erased');
      }
    }
    if(this.state.flag_)
    {
      this.state.save_mission[this.state.mission_cnt] = "Rescue";
      this.state.mission_cnt++;
    }
    this.state.flag_=1;
      break;

    case 2:

    for(let i=0;i<8;i++)
    {
      if(this.state.save_mission[i]==="Hack"){
          this.state.save_mission.splice(i, 1);
          this.state.mission_cnt--;
          this.state.flag_=0;
      }
    }
    if(this.state.flag_)
    {
      this.state.save_mission[this.state.mission_cnt] = "Hack";
      this.state.mission_cnt++;
    }
    this.state.flag_=1;

      break;

    case 3:

    for(let i=0;i<8;i++)
    {
      if(this.state.save_mission[i]==="KillEnemies"){
          this.state.save_mission.splice(i, 1);
          this.state.mission_cnt--;
          this.state.flag_=0;
      }
    }
    if(this.state.flag_)
    {
      this.state.save_mission[this.state.mission_cnt] = "KillEnemies";
      this.state.mission_cnt++;
    }
    this.state.flag_=1;

      break;

    case 4:

    for(let i=0;i<8;i++)
    {
      if(this.state.save_mission[i]==="killBoss"){
          this.state.save_mission.splice(i, 1);
          this.state.mission_cnt--;
          this.state.flag_=0;
      }
    }
    if(this.state.flag_)
    {
      this.state.save_mission[this.state.mission_cnt] = "killBoss";
      this.state.mission_cnt++;
    }
    this.state.flag_=1;

  
      break;

    case 5:
    for(let i=0;i<8;i++)
    {
      if(this.state.save_mission[i]==="BreakRock"){
          this.state.save_mission.splice(i, 1);
          this.state.mission_cnt--;
          this.state.flag_=0;
      }
    }
    if(this.state.flag_)
    {
      this.state.save_mission[this.state.mission_cnt] = "BreakRock";
      this.state.mission_cnt++;
    }
    this.state.flag_=1;


      break;

    case 6:
    for(let i=0;i<8;i++)
    {
      if(this.state.save_mission[i]==="activeTrapKillEnemy"){
          this.state.save_mission.splice(i, 1);
          this.state.mission_cnt--;
          this.state.flag_=0;
      }
    }
    if(this.state.flag_)
    {
      this.state.save_mission[this.state.mission_cnt] = "activeTrapKillEnemy";
      this.state.mission_cnt++;
    }
    this.state.flag_=1;

      break;

    case 7:
    for(let i=0;i<8;i++)
    {
      if(this.state.save_mission[i]==="HackWithPassword"){
          this.state.save_mission.splice(i, 1);
          this.state.mission_cnt--;
          this.state.flag_=0;
      }
    }
    if(this.state.flag_)
    {
      this.state.save_mission[this.state.mission_cnt] = "HackWithPassword";
      this.state.mission_cnt++;
    }
    this.state.flag_=1;

      break;
    }
  
}

/**
JSON 양식 저장
*/
make_json = () => {
  
  this.state.save_file = {
    "_id": "",
    "id": 0,
    "title": " ",
    "description": "",
    "levelData": {
      "missions": {
        "main": this.state.save_mission,//완성
        "sub": []
      },
      "size": {
        "y": 6,
        "x": 6
      },
      "gameplay": [
        {
          "name": "",
          "_id": "",
          "objects": this.state.save_object//완성
        }
      ],
      "art": [
        {
          "name": "Tiles",
          "layerType": 0,
          "active": true,
          "_id": "",
          "tiles": this.state.save_tiles
        },
        {
          "name": "props",
          "layerType": 1,
          "active": true,
          "_id": "",
          "tiles": this.state.save_props
        }
      ]
    },
    "position": {
      "x": 0,
      "y": 0
    },
    "__v": 0
  }

  let userInfo = {
    /** 추후에, 주석처리된 소스로 바꾸기 바람 */
    // sid: sessionStorage.getItem('sid'),
    // id: sessionStorage.getItem('id'),
    // userEnv: sessionStorage.getItem('env')
    sid: null,
    id: 'nuvo@khu.ac.kr',
    userEnv: 'google'
  }
  
  let data = {
    level: JSON.stringify(this.state.save_file),
    userInfo: JSON.stringify(userInfo)
  }
  
  console.log(this.state.save_file)
  // console.log(data);
  
  fetch('/savelevel', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // res = res.json();
    // console.log(res);
  })
}
  

/**
 * 주변 Layout
 */
render() {
  return (
          <div className="col-sm-8" id="stage-sec"></div>
  );
}
}

export default TileApp;
