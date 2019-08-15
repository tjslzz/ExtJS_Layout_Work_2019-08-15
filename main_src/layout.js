//第一题
let firstQuestion = new Ext.form.FormPanel({
    xtype: 'fieldset',
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
let SecondQuestion = new Ext.form.FormPanel({
    xtype: 'fieldset',
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
//提交
let submitConfig = {
    xtype: 'form',
    id: 'card-2',
    labelWidth: 75,

    defaultType: 'textfield',
    items: [{
        fieldLabel: '第一题',
        name: 'first',
        id: 'first',
        allowBlank: false,
    }, {
        fieldLabel: '最后一题',
        name: 'last',
        id: 'last',
        allowBlank: false
    }
    ],
    buttons: [
        { text: 'Save' },
        { text: 'Cancel' }
    ]
}
//布局
let navHandler = function (direction) {
    var l = Ext.getCmp('card').getLayout();
    var i = l.activeItem.id.split('card-')[1];
    i = parseInt(i) + direction;
    l.setActiveItem(i);
    if(i == 2) Ext.getCmp('card-2').getForm().load([{'first':'yes'},{'last':'no'}]);
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
    collapsible: false,
    region: 'center',
    items: cartConfig
})