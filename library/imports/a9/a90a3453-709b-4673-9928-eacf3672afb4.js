"use strict";
cc._RF.push(module, 'a90a3RTcJtGc5ko6s82cq+0', '0');
// script/virus/0.js

'use strict';

var _cc$Class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

cc.Class((_cc$Class = {
    extends: cc.Component,

    properties: {
        m_labHp: cc.Label,
        m_Back: [cc.Node],
        m_Body: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {
        this.m_bHurt = false;
        this.m_bDie = false;
        this.m_bSleep = false;
        this.m_Speed = cc.v2(0, 0);
        this.m_LastSpeedPro = 0;
        this.m_DieGold = 0;
    },
    onLoad: function onLoad() {
        this.m_Back[0].runAction(cc.repeatForever(cc.rotateBy(8, 360)));
        this.m_Back[1].runAction(cc.repeatForever(cc.rotateBy(8, -360)));
        this.setHp(100);
        // this.setColor(new cc.Color(181,130,255));
        this.init();
    },
    init: function init() {
        this.m_Body.active = true;
        this.node.setScale(cc.v2(1, 1));
        this.m_Body.setScale(cc.v2(1, 1));
        this.m_bDie = false;
        this.randomSpeed();
        this.setMoveStart();
        // this.randomColor();
        // this.runRandomColorAction(0.5,this.node);
    },
    start: function start() {},

    hit: function hit() {
        if (this.m_bDie) return;
        this.m_HP -= 1;
        this.setHp(this.m_HP);
        gVirusMake.hit(-1);
        for (var key in this.colorObjcet) {
            if (this.colorObjcet.hasOwnProperty(key)) {
                if (this.m_HP <= parseInt(key)) {
                    this.runColorAction(0.2, this.node, this.colorObjcet[key]);
                    break;
                }
            }
        }

        if (this.m_HP <= 0) {
            this.m_bDie = true;
            var seq = cc.sequence(cc.scaleTo(0.05, 0, 0), cc.callFunc(function () {
                gVirusMake.createDieAnim(this.node);
            }.bind(this)), cc.delayTime(1), cc.callFunc(function () {
                gVirusMake.onVirusKilled(this.node);
            }.bind(this)));
            this.m_Body.runAction(seq);
        } else {
            this.hurt();
        }
    },
    stopAllActions: function stopAllActions(node) {
        if (node == null) node = this.node;
        for (var i = 0; i < node.children.length; i++) {
            node.children[i].stopAllActions();
            this.stopAllActions(node.children[i]);
        }
        this.node.stopAllActions();
    },
    hurt: function hurt() {
        if (!this.m_bHurt) {
            this.m_bHurt = true;
            var seq = cc.sequence(cc.scaleBy(0.08, 1.1, 1.1), cc.scaleBy(0.1, 0.9, 0.9), cc.callFunc(function () {
                this.m_bHurt = false;
            }.bind(this)));
            this.node.runAction(seq);
        }
    },
    setMoveStart: function setMoveStart() {},
    onCollisionEnter: function onCollisionEnter(other, self) {

        if (other.tag == 100 || other.tag == 99 || other.tag == 98) {
            this.hit();
        }
    },
    setColor: function setColor(color, colorObject) {
        this.colorObjcet = colorObject;
        this.m_CurColor = color;
        this.node.color = color;
        setVirusColor(this.node, color);
    },

    setScale: function setScale(scale) {
        this.node.setScale(cc.v2(scale, scale));
    },
    setSpeed: function setSpeed(speed) {
        this.m_Speed = speed;
    },
    //死亡掉落金币
    setDieGold: function setDieGold(gold) {
        this.m_DieGold = gold;
    },
    runColorAction: function runColorAction(time, node, color) {
        this.m_CurColor = color;
        for (var i = 0; i < node.children.length; i++) {
            var js = node.children[i].getComponent('color');
            if (js != null) {

                if (node.children[i].colorAction != null) {
                    node.children[i].stopAction(node.children[i].colorAction);
                }
                var colorAction = cc.tintTo(time, color.r, color.g, color.b);
                node.children[i].colorAction = colorAction;
                node.children[i].runAction(colorAction);
            }
            this.runColorAction(time, node.children[i], color);
        }
    },
    // randomColor(){
    //     this.setColor(this.getRandomColor());
    // },
    // getRandomColor(){
    //     var arr = new Array(3);
    //     arr[0] = random(127,255);
    //     arr[1] = 127;
    //     arr[2] = 255;
    //     var rgb = new Array();
    //     for (var i = 0; i < 2; i++) {
    //         var index = random(0,arr.length);
    //         rgb.push(arr[index]);
    //         arr.splice(index,1);
    //     }
    //     rgb.push(arr[0]);
    //     return new cc.Color(rgb[0],rgb[1],rgb[2]);
    // },
    setHp: function setHp(num) {
        this.m_HP = num;
        this.m_labHp.string = num;
        this.m_BaseHp = num;
    }
}, _defineProperty(_cc$Class, 'setMoveStart', function setMoveStart() {
    this.node.y = 1780;
    this.node.x = random(160, 740);
}), _defineProperty(_cc$Class, 'randomSpeed', function randomSpeed() {
    if (this.m_bSleep) return;
    this.m_Speed.x = random(80, 150);
    this.m_Speed.y = random(80, 150);
    if (random(0, 100) > 50) {
        this.m_Speed.x *= -1;
    }
}), _defineProperty(_cc$Class, 'update', function update(dt) {
    if (this.m_bDie || this.m_bSleep) return;
    if (this.node.y < -150) {
        this.setMoveStart();
        this.randomSpeed();
    }
    this.node.y -= this.m_Speed.y * dt;
    if (this.m_Speed.x > 0 && this.node.x > 840 || this.m_Speed.x < 0 && this.node.x < 60) {
        this.m_Speed.x *= -1;
    }
    this.node.x += this.m_Speed.x * dt;
}), _defineProperty(_cc$Class, 'sleep', function sleep(_sleep, pro) {
    this.m_bSleep = _sleep;
}), _cc$Class));

cc._RF.pop();