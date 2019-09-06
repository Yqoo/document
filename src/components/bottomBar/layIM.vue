<!-- 即时通讯 -->
<template>
    <div class="layIM">
    </div>
</template>

<script>
export default {
  props: ["showIM"],
  data() {
    return {};
  },
  methods: {
      handleClose(){}
  },
  mounted() {
    let baseUrl = 'http://192.168.0.101:8080';
    layui.extend({
        'socket':'/static/layui/mods/socket'
    });
    layui.use(["layim","socket"], function(layim, socket) {
        //先来个客服模式压压精
        var initData;
        var firstView=[];//登陆成功后第一次        TODO:此数据在刷新页面时候需要保留     否则有小BUG
        var local={};
        var cache =  layui.layim.cache();
        socket.config({
            log:true,
            server:'ws://192.168.0.101:8889',
            token:baseUrl + '/account/token'
        });
        socket.on('msg',function (d) {
            layim.getMessage(d);
        });
        //基础配置
        layim.config({
            init: {
                url: baseUrl+'/layim/init'
            }
            ,members: {
                url: baseUrl+'/layim/member'
            }
            ,uploadImage: {
                url:baseUrl+ '/upload/image' //（返回的数据格式见下文）
                ,type: '' //默认post
            }
            ,uploadFile: {
                url: baseUrl+'/upload/file' //（返回的数据格式见下文）
                ,type: '' //默认post
            }
            ,isAudio: true //开启聊天工具栏音频
            ,isVideo: true //开启聊天工具栏视频
            ,initSkin: '5.jpg' //1-5 设置初始背景
            ,notice: true //是否开启桌面消息提醒，默认false
            ,msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html' //消息盒子页面地址，若不开启，剔除该项即可
            ,find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
            ,chatLog: layui.cache.dir +'css/modules/layim/html/chatlog.html' //聊天记录页面地址，若不开启，剔除该项即可
        });
        //监听在线状态的切换事件
        layim.on('online', function(data){
            //console.log(data);
        });
        //监听签名修改
        layim.on('sign', function(value){
            //console.log(value);
        });
        //监听layim建立就绪
        layim.on('ready', function(res){
       	initData=res;
        layim.msgbox(5); //消息盒子消息提示

       	
       	var localAll = layui.data('layim');
       	if(localAll.hasOwnProperty(cache.mine.id)){
       	   local=localAll[cache.mine.id]
       	}else{
       	   local={};
       	}
       	if(!local.hasOwnProperty('chatlog')){
        	local['chatlog']={};
        }
        });
        //监听发送消息
        layim.on('sendMessage', function(data){
            socket.send(data);
        });
        //监听查看群员
        layim.on('members', function(data){
            //console.log(data);
        });
        //监听聊天窗口的切换
        layim.on('chatChange', function(res){
             var type = res.data.type;
        	 var targetId = res.data.id;
             var offLineMsg;
		if(firstView.indexOf(targetId)<0){//登陆后第一次打开窗口 才请求历史记录
             $.ajax({
                 url:baseUrl+"/layim/getOffLineMsg",
                 data:{'mineId':initData.mine.id,'targetId':targetId,'type':type},
                 type:"Post",
                 dataType:"json",
                 async:false,//同步请求离线消息
                 success:function(data){
                   offLineMsg=data.data;
                   firstView.push(targetId);
                 },
                 error:function(data){
                   alert('未知错误,请联系管理员',data.msg);
                 }
             });
             if(type === 'friend'){
                 // 模拟标注好友状态    获取在线状态
                 layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
             } else if(type === 'group'){
            	 num=20-offLineMsg.length;
            	 while (num>0){//2、判断循环条件;
	                 layim.getMessage({
	                     system: true
	                     ,id: res.data.id
	                     ,type: type
	                     ,content: '最近群聊消息已经同步,更多内容请查看聊天记录'
	                 });
	                 num--;
				}
             }
          	if(!local.chatlog.hasOwnProperty(type+targetId)){
         		local.chatlog[type+targetId]=[]
         	}
            for(i in offLineMsg){
            	if(type === 'friend'){
				  layim.getMessage({ //消息加入 
               	  username: offLineMsg[i].username //消息来源用户名
               	  ,avatar: offLineMsg[i].avatar //消息来源用户头像
               	  ,id: res.data.id //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
               	  ,type: type  //聊天窗口来源类型
               	  ,content: offLineMsg[i].content //消息内容
               	  ,cid: offLineMsg[i].cid //消息id
               	  ,mine:offLineMsg[i].mine //是否我发送的消息，如果为true，则会显示在右方
               	  ,fromid: offLineMsg[i].fromid //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
               	  ,timestamp: Number(offLineMsg[i].timestamp) //服务端时间戳毫秒数
               	  })
            	}  
               	var msg={};
                msg.username=offLineMsg[i].username;
                msg.avatar=offLineMsg[i].avatar;
                msg.id=res.data.id;
                msg.type=type;
                msg.content=offLineMsg[i].content;
                msg.cid=offLineMsg[i].cid;
                msg.mine=offLineMsg[i].mine ;
             	msg.fromid=offLineMsg[i].fromid ;
             	msg.timestamp=Number(offLineMsg[i].timestamp) ;
             	
             	local.chatlog[type+targetId].push(msg)
            }
            length=local.chatlog[type+targetId].length
            if(length>20){//只留下最近20条
               local.chatlog[type+targetId]=local.chatlog[type+targetId].slice(length-20,length)
            }
            //向localStorage同步数据
            layui.data('layim', {
              key: cache.mine.id
              ,value: local
            });
		}
        });
    });
  }
};
</script>
<style lang='less' scoped>
</style>