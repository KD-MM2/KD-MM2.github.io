
let sgenp =(function(){function rawToHex(raw){var hex="";var hexChars="0123456789abcdef";for(var i=0;i<raw.length;i++){var c=raw.charCodeAt(i);hex+=(hexChars.charAt((c>>>4)&0x0f)+hexChars.charAt(c&0x0f))}return hex}function sha1Raw(raw){return binaryToRaw(sha1Binary(rawToBinary(raw),raw.length*8))}function binaryToRaw(bin){var raw="";for(var i=0,il=bin.length*32;i<il;i+=8){raw+=String.fromCharCode((bin[i>>5]>>>(24-i%32))&0xff)}return raw}function sha1Binary(bin,len){bin[len>>5]|=0x80<<(24-len%32);bin[((len+64>>9)<<4)+15]=len;var w=new Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0,il=bin.length;i<il;i+=16){var _a=a;var _b=b;var _c=c;var _d=d;var _e=e;for(var j=0;j<80;j++){if(j<16){w[j]=bin[i+j]}else{w[j]=_rotateLeft(w[j-3]^w[j-8]^w[j-14]^w[j-16],1)}var t=_add(_add(_rotateLeft(a,5),_ft(j,b,c,d)),_add(_add(e,w[j]),_kt(j)));e=d;d=c;c=_rotateLeft(b,30);b=a;a=t}a=_add(a,_a);b=_add(b,_b);c=_add(c,_c);d=_add(d,_d);e=_add(e,_e)}return[a,b,c,d,e]}function _add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}function _rotateLeft(n,count){return(n<<count)|(n>>>(32-count))}function _ft(t,b,c,d){if(t<20){return(b&c)|((~b)&d)}else if(t<40){return b^c^d}else if(t<60){return(b&c)|(b&d)|(c&d)}else{return b^c^d}}function _kt(t){if(t<20){return 1518500249}else if(t<40){return 1859775393}else if(t<60){return-1894007588}else{return-899497514}}function rawToBinary(raw){var binary=new Array(raw.length>>2);for(var i=0,il=binary.length;i<il;i++){binary[i]=0}for(i=0,il=raw.length*8;i<il;i+=8){binary[i>>5]|=(raw.charCodeAt(i/8)&0xFF)<<(24-i%32)}return binary}function stringToRaw(string){var raw="",x,y;var i=-1;var il=string.length;while(++i<il){x=string.charCodeAt(i);y=i+1<il?string.charCodeAt(i+1):0;if(0xd800<=x&&x<=0xdbff&&0xdc00<=y&&y<=0xdfff){x=0x10000+((x&0x03ff)<<10)+(y&0x03ff);++i}if(x<=0x7f){raw+=String.fromCharCode(x)}else if(x<=0x7ff){raw+=String.fromCharCode(0xc0|((x>>>6)&0x1f),0x80|(x&0x3f))}else if(x<=0xffff){raw+=String.fromCharCode(0xe0|((x>>>12)&0x0f),0x80|((x>>>6)&0x3f),0x80|(x&0x3f))}else if(x<=0x1fffff){raw+=String.fromCharCode(0xf0|((x>>>18)&0x07),0x80|((x>>>12)&0x3f),0x80|((x>>>6)&0x3f),0x80|(x&0x3f))}}return raw}function hmacRaw(key,data){var binaryKey=rawToBinary(key);if(binaryKey.length>16){binaryKey=sha1Binary(binaryKey,key.length*8)}var ipad=new Array(16);var opad=new Array(16);for(var i=0;i<16;i++){ipad[i]=binaryKey[i]^0x36363636;opad[i]=binaryKey[i]^0x5c5c5c5c}var hash=sha1Binary(ipad.concat(rawToBinary(data)),512+data.length*8);return binaryToRaw(sha1Binary(opad.concat(hash),512+160))}var tests={hmac:{"fbdb1d1b18aa6c08324b7d64b71fb76370690e1d":["",""],"de7c9b85b8b78aa6bc8a7a36f70a90701c9db4d9":["key","The quick brown fox jumps over the lazy dog"]},sha1:{"da39a3ee5e6b4b0d3255bfef95601890afd80709":"","2fd4e1c67a2d28fced849ee1bb76e7391b93eb12":"The quick brown fox jumps over the lazy dog",}};return{sha1:function(s){return rawToHex(sha1Raw(stringToRaw(s)))},sha1Hex:function(value){return rawToHex(sha1Raw(this.hexToString(value)))},hmac:function(k,d){return rawToHex(hmacRaw(stringToRaw(k),stringToRaw(d)))},hexToString:function(hex){var str='';for(var i=0,il=hex.length;i<il;i+=2){str+=String.fromCharCode(parseInt(hex.substr(i,2),16))}return str},test:function(){var success=true;for(var expectedOutput in tests.sha1){if(tests.sha1.hasOwnProperty(expectedOutput)){var input=tests.sha1[expectedOutput];var output=this.sha1(input).toLowerCase();if(output!==expectedOutput){console.error("sha1("+input+") was "+output+" (expected: "+expectedOutput+")");success=false}}}for(var expectedOutput in tests.hmac){if(tests.hmac.hasOwnProperty(expectedOutput)){var input=tests.hmac[expectedOutput];var output=this.hmac(input[0],input[1]).toLowerCase();if(output!==expectedOutput){console.error("hmac("+input[0]+", "+input[1]+") was "+output+" (expected: "+expectedOutput+")");success=false}}}return success}}})();

//SGDS
let ds=[];
//ESGDS

let utm_medium = 'notification';
function sg_fire_actions(){
	utm_medium = 'notification-invalid';
	jQuery(document).ready((function(e) {
		let menu = jQuery('.toplevel_page_salesgen a');
		menu.each(function (){

			if (jQuery(this).attr('href').indexOf('upsell') > 0 ) {
				//jQuery(this).attr('href','https://salesgen.io/upsell-blast-upsell-machine/');
				jQuery('body').append('<div class="notice" style="z-index:9999;width:100%;margin:0!important;position: fixed; right: 0; left:0; bottom:0; background-color: #2482fa; padding: 4px 20px;color:#fafafa;"><h3 style="line-height: 1.1em;color:#FFEB3B;display:block;z-index:999;padding:0;margin:0;">You are using invalid Upsell Blast license.</h3><p>License của bạn đã hết hạn vui lòng gia hạn hoặc sử dụng license mới để các tính năng hoạt động trở lại. Lưu ý, nếu bạn đã kích hoạt license mà vẫn nhìn thấy thông báo này, vui lòng thử bấm Ctrl + Shift +R để xóa cache khi tải trang.</p><a target="_blank" href="https://salesgen.io/upsell-blast-upsell-machine/?utm_source=client-store&utm_medium='+utm_medium+'-bottom&utm_campaign=normal" style="background: #ff9800;border-color: #ff9800;color: #273243;text-decoration: none;text-shadow: none;font-weight: 700;" class="button-primary">Gia hạn ngay hôm nay</a></div>');
				setInterval(function (){
		        	jQuery('[data-group="upsellblast"]').html('<p>Please try to reload the browser after 2 minutes, the system will update whitelist domains soon. Try press Ctrl + Shift + R on reload page to clear cache browser.</p><p>Hệ thống đang cập nhật danh sách domain, vui lòng thử lại sau 2 phút nữa. Nếu bạn vẫn thấy thông báo này, vui lòng bấm Ctrl + Shift + R để xóa cache trình duyệt khi load lại page.</p>');
        		}, 50);
			}
		});
    }));
}
// if (ds.indexOf(sgenp.sha1(window.location.hostname.replace('www.',''))) < 0) {sg_fire_actions();}



(function($){
	window.sg_leuleu = {

		cfg: function () {
			let status = localStorage.getItem("sg_notify");
			if ( status == null ) {
				return { status : 'on' };
			} else {
				return JSON.parse(status);
			}
		},

		init : function () {

			let cfg = sg_notify.cfg();
			if ( cfg.status !== 'on' ) {
				return;
			}
			if($('.sg_notify').length == 0 ) {
				let wrap = $('#wpbody-content h1');
				//let content = $('<div class="sg_notify notice notice-success is-dismissible" style="background: #1a82fa;color: #e7e7e7;"><img src="https://salesgen.io/wp-content/uploads/2023/11/blackfriday_small.jpg" style="float: right; margin-top:20px; max-width: 280px;"/><p></p><p><strong>Ưu đãi cực lớn từ SalesGen!</strong></p><p>Bạn sẽ có cơ hội sở hữu license trọn đời của plugin Upsell Blast chỉ từ <strong>$65</strong></p><p>Plugin Upsell Blast giúp tăng giá trị trung bình trên mỗi đơn hàng cho store WoooCommmerce của bạn. Giúp bạn có thêm lợi nhuận bằng các phương pháp upsell đã được kiểm chứng.</p><p>Ngoài license trọn đời cho Upsell Blast, bạn sẽ nhận được các món quà sau:<ol><li>Mẫu store xịn sò cho năm mới bùng nổ</li><li>10 tips & hướng dẫn độc quyền để quản lý WooCommerce dễ hơn.</li><li>Mã giảm giá 30% cho mọi sản phẩm trên WooMMO.com.</li></ol></p><p>Lưu ý: Ưu đãi này sẽ kết thúc vào ngày 05/12/2023</p><p class="submit"><a target="_blank" href="https://salesgen.io/black-friday-cyber-monday/?utm_source=client-store&utm_medium='+utm_medium+'&utm_campaign=blackfriday2023" style="background: #ff9800;border-color: #ff9800;color: #273243;text-decoration: none;text-shadow: none;font-weight: 700;" class="button-primary">Xem chương trình ưu đãi</a><a href="#" style="margin-left:10px;color: #c2c2c2;" class="sg-notify-off button-link">Không, tôi không muốn kiếm thêm lợi nhuận</a><a href="#" style="margin-left:10px;color: #c2c2c2;" class="sg-notify-off button-link">Tôi đã mua rồi</a></p></div>');
				let content = $('<div class="sg_notify notice notice-success is-dismissible" style="background: #F44336;color: #e7e7e7;"><p><strong>Lưu ý, ưu đãi BlackFriday của SalesGen sẽ kết trong 12 giờ tới!</strong></p><p>Đây là cơ hội cuối cùng để bạn sở hữu license trọn đời của plugin Upsell Blast chỉ từ <strong>$65</strong></p><p class="submit"><a target="_blank" href="https://salesgen.io/black-friday-cyber-monday/?utm_source=client-store&utm_medium='+utm_medium+'&utm_campaign=blackfriday2023" style="background: #ff9800;border-color: #ff9800;color: #273243;text-decoration: none;text-shadow: none;font-weight: 700;" class="button-primary">Xem chương trình ưu đãi</a><a href="#" style="margin-left:10px;color: #c2c2c2;" class="sg-notify-off button-link">Không, tôi không muốn thêm lợi nhuận</a><a href="#" style="margin-left:10px;color: #c2c2c2;" class="sg-notify-off button-link">Tôi đã mua rồi</a></p></div>');
				wrap.after(content);

				let offlink = content.find('.sg-notify-off');
				offlink.on('click', function (e){
					e.preventDefault();
					sg_notify.turn_off();
					$(this).closest('.notice').hide();
				});	
			}

		},

		turn_off: function () {
			localStorage.setItem("sg_notify", '{"status":"off"}');
		}
	}

})(jQuery);
jQuery( document ).ready(function() {
	//sg_leuleu.init();
});
