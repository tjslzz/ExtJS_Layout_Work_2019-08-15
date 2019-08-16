//第一题
let firstQuestion = new Ext.form.FieldSet({
    id: 'card-0',
    height: 200,
    title: 'Q1 番茄酱属于以下哪种辣鸡',
    defaultType: 'radio',
    items: [{
        boxLabel: '湿辣鸡',
        name: 'rubbish'
    }, {
        boxLabel: '干辣鸡',
        name: 'rubbish'
    }, {
        boxLabel: '有害辣鸡',
        name: 'rubbish'
    }, {
        boxLabel: '可回收物',
        name: 'rubbish'
    }]
})
//最后一题
let SecondQuestion = new Ext.form.FieldSet({
    id: 'card-1',
    height: 200,
    title: 'Q50 王大叔出门遛狗后，哪些是正确处理狗狗粑粑的办法？（多选）',
    defaultType: 'checkbox',
    items: [{
        boxLabel: '把粑粑用废报纸包好带回家冲掉'
    }, {
        boxLabel: '受污染的报纸按有害辣鸡处理'
    }, {
        boxLabel: '没受污染的报纸按可回收辣鸡处理'
    }, {
        boxLabel: '受污染的报纸浸水后当湿辣鸡处理'
    }]
})
// var writer = new Ext.data.JsonWriter({
//     encode: false
// });
// var reader = new Ext.data.JsonReader({idProperty: 'id'}, {name:'info'});
// var proxy = new Ext.data.HttpProxy({
//     url: 'text.json'
// });
// var store = new Ext.data.Store({
//     proxy: proxy,
//     reader: reader,
//     writer: writer,
//     autoLoad: true,
//     autoSave: false  // -- disable cell-updates
// });
// var rec = {id:1, name:'foo@bar.com'}

//提交
let submitConfig = new Ext.form.FormPanel({
    xtype: 'form',
    id: 'card-2',
    labelWidth: 100,
    items: [{
        xtype: 'textfield',
        fieldLabel: '第一题',
        name: 'first',
        id: 'first',
        allowBlank: false,
        msgTarget: 'side'
    }, {
        width: 500,
        xtype: 'textarea',
        fieldLabel: '最后一题',
        name: 'last',
        id: 'last',
        allowBlank: false,
        msgTarget: 'side'
    }
    ],
    buttons: [{
        text: '重置',
        handler: function () {
            Ext.getCmp('card-2').getForm().reset();
        }
    }, {
        text: '提交',
        handler: function () {
            if (Ext.getCmp('card-2').getForm().isValid()) {
                let str = ""
                for(i in Ext.getCmp('card-2').getForm().getFieldValues(true)){
                    str += `${i} : ${Ext.getCmp('card-2').getForm().getFieldValues(true)[i]} , `
                }
                Ext.Msg.alert('Congratulation!', str);

                // Ext.Msg.alert('Congratulation!', `${Ext.getCmp('card-2').getForm().getValues(true)}`);
                // Ext.Msg.alert('Congratulation!', `${Ext.getCmp('card-2').getForm().items.items[0].getValue()} , ${Ext.getCmp('card-2').getForm().items.items[1].getValue()}`);

            }

        }
    }]
})
let anser1 = Ext.getCmp('card-0').items.items
let anser2 = Ext.getCmp('card-1').items.items
//布局
let navHandler = function (direction) {
    var l = Ext.getCmp('card').getLayout();
    var i = l.activeItem.id.split('card-')[1];
    i = parseInt(i) + direction;
    l.setActiveItem(i);
    if (i == 2) {
        Ext.getCmp('first').setRawValue(anser1.filter(item => item.checked == true)[0].boxLabel)
        Ext.getCmp('last').setRawValue(anser2.filter(item => item.checked == true).map(item => item.boxLabel))
    }
    Ext.getCmp('prev').setDisabled(i == 0);
    Ext.getCmp('next').setDisabled(i == 2);
};
let cartConfig = {
    xtype: 'panel',
    id: 'card',
    title: '捡垃圾',
    layout: 'card',
    activeItem: 0,
    defaults: {
        border: false
    },
    bbar: [
        {
            id: 'prev',
            text: '上一页',
            handler: navHandler.createDelegate(this, [-1]),
            disabled: true
        },
        '->',
        {
            id: 'next',
            text: '下一页',
            handler: navHandler.createDelegate(this, [1])
        }
    ],
    items: [firstQuestion, SecondQuestion, submitConfig]
}

var cardLayout = new Ext.Panel({
    items: cartConfig
})