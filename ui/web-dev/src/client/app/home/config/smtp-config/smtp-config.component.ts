import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal, NgbActiveModal,NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from 'ng2-translate';
//import { ModalContent,ModalContentNewUser,PaginationAdvanced,ModalContentEditUser } from '../../../shared/index';
import { OpenAPIService } from '../../../server/index';
import { PromptEmitService} from '../../../server/prompt-emit/index';


/**
 * This class represents the lazy loaded ContainerComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ar-smtp-config',
  templateUrl: 'smtp-config.component.html',
  styleUrls: ['smtp-config.component.css'],
  providers: [NgbActiveModal,NgbAlertConfig]
})

export class SMTPConfigComponent {

	error:any;
	userCountMe:any;
	smtpGetParams:any;
	smtpParams: any = {
	 "host": "",//SMTP服务器地址
	 "password": "",//用户密码
	 "port": 25,//SMTP服务器端口号
	 "user": "",//用户账号发送邮箱
	 "emails": []//测试邮箱
	};
	 smtpTestParams: any = {
	  "host": "",//SMTP服务器地址
	  "password": "",//用户密码
	  "port": 25,//SMTP服务器端口号
	  "user": "",//用户账号发送邮箱
	  "emails": []//测试邮箱
	};
	hostError = '';//SMTP服务器地址
	portError = '';//SMTP服务器端口号
	passwordError = '';//用户密码
	userError = '';//发送邮箱
	recvEmailError = '';//测试邮箱
	hasError = true;//前面四项有错误
	hasrecvEmailError = true;//测试邮箱有错误
	hasSMTPRes = false;//判断SMTP是否已经有保存项
	testSMTPRes :any = 'hei';//测试结果
	testSMTPResul :any = 'hei';//测试结果
	saveSMTPRes :any = 'hei';//保存结果
	testSMTPResErr = '';//测试结果错误信息
	showPass = true;//默认密码框加密显示
	showError = false;//默认密码框加密显示
	saveSuc = false;//保存是否成功，判断测试按钮是否可点
	testSuc = false;//测试是否有结果，判断定时器开关
	saveRes = false;//保存是否有结果，判断定时器开关
	// 定时器
	timer: any;



	constructor(public modalService: NgbModal,public activeModal: NgbActiveModal,
		private translate: TranslateService,public openAPIService:OpenAPIService,
		public promptEmitService:PromptEmitService
	) {
	}

	// // 组件输入属性值发生改变（首次调用一定会发生在 ngOnInit之前。）
	// ngOnChanges(changes) {
	//   console.log('On changes', changes);
	// }

	// // 脏值检测器被调用后调用
	// ngDoCheck(changes) {
	//   console.log('Do check');
	//   console.log(changes);
	// }

	ngOnInit() {
	  this.getSMTP();
	}




	// 每一秒更新时间差
	setTimeInit(type:string,name:string) {
		let me = this;
		 this.timer = setTimeout(() => {
		 	if(type === 'test') {
		 		if(!me.testSuc){
		 			me.testSMTPResul = name;
		 			me.hasrecvEmailError =true;
		 		}
		 	} else if(type === 'save') {
		 		if(me.saveRes){
		 			me.saveSMTPRes = 'hei';
		 		} else {
		 			me.saveSMTPRes = name;
		 			me.hasError = true;
		 		}

		 	}

	 	}, 1000);
	}

	// 销毁组件时清除定时器
	ngOnDestroy() {
	 if (this.timer) {
	  clearTimeout(this.timer);
	 }
	}


	/**
	 * assword()
	 */

	showPassword() : void {
		let me = this;
		let showPass = me.showPass;
		if(showPass == true) {
			me.showPass = false;//密码框文本框显示
		} else {
			me.showPass = true;//默认密码框加密显示
		}

	}



	/**
	 * 获取SMTP
	 */
	getSMTP(): void {
	  let me = this;
	  let url = `/manager/smtp`;
	  let name = `smtp`;
	  this.openAPIService.getPromise(url,name,false)
	    .then(
	      smtpRes => {
	      	me.saveRes = true;//保存是否有结果
	      	me.testSuc = true;//测试是否成功
	      	if(smtpRes === '' || smtpRes === undefined) {
	      		me.hasSMTPRes = false;
	      		me.hasError = true;
	      		me.hasrecvEmailError = true;
	      	} else {
	      		me.hasSMTPRes = true;
	      		me.hasError = false;
	      		me.smtpGetParams = smtpRes;
	      		me.smtpParams = smtpRes;
	      		me.saveSuc = true;//保存是否成功

	      	}
	      },
	      error => {
	      	me.testSMTPRes = 'hei';//测试结果
	        this.error = error;
	        this.promptEmitService.change.emit(this.translate.instant(this.error));
	      }
	    )
	}


	/**
	 * 保存SMTP
	 */
	postSMTP(): void {
	  let me = this;
	  let url = `/manager/smtp`;
	  let name = `smtp`;
	  me.smtpParams.port = Number(me.smtpParams.port);
	  let body = JSON.stringify(me.smtpParams);
	  me.saveSuc = false;//保存是否成功
	  me.saveRes = false;//保存是否有结果
	  if(me.hasSMTPRes) {

	  	  this.openAPIService.putPromise(url,body,name,false)//修改
	  	    .then(
	  	      smtpRes => {
	  	      	me.saveRes = true;//保存是否有结果
	  	      	me.hasError = false;
	  	      	me.saveSMTPRes = 'hei';
	  	      	if(smtpRes == '') {
	  	      		me.saveSuc = true;//保存是否成功
	  	      		me.hasSMTPRes = true;
                    me.smtpGetParams = me.smtpParams;
	  	      		this.promptEmitService.change.emit(this.translate.instant('保存SMTP成功！'));
	  	      	}
	  	      },
	  	      error => {
	  	      	me.saveRes = true;//保存是否有结果
	  	      	me.hasError = false;
	  	      	me.saveSMTPRes = 'hei';
	  	        this.error = error;
	  	        me.saveSuc = false;//保存是否成功
	  	        this.promptEmitService.change.emit(this.translate.instant(this.error));
	  	      }
	  	    )
	  } else {
	  	this.openAPIService.postPromise(url,body,name,false)//新建
	  	  .then(
	  	    smtpRes => {
	  	    	me.saveRes = true;//保存是否有结果
	  	    	me.hasError = false;
	  	    	me.saveSMTPRes = 'hei';
	  	    	if(smtpRes == '') {
	  	    		me.saveSuc = true;//保存是否成功
	  	    		me.hasSMTPRes = true;
                    me.smtpGetParams = me.smtpParams;
	  	    		this.promptEmitService.change.emit(this.translate.instant('保存SMTP成功！'));
	  	    	}
	  	    },
	  	    error => {
	  	      me.saveRes = true;//保存是否有结果
	  	      me.hasError = false;
	  	      me.saveSMTPRes = 'hei';
	  	      this.error = error;
	  	      me.saveSuc = false;//保存是否成功
	  	      this.promptEmitService.change.emit(this.translate.instant(this.error));
	  	    }
	  	  )
	  }
	  me.setTimeInit('save','saveTimeout');

	}


	/**
	 * 测试邮箱
	 */
	postTestSMTP(): void {
		let me = this;
		let value = me.smtpTestParams.emails[0];
		let url = `/manager/smtp/test`;
		let name = `smtp`;
		me.testSuc = false;//测试是否成功
		me.testSMTPRes = 'hei';//测试结果
		me.smtpParams.port = Number(me.smtpParams.port);
		me.smtpTestParams.host = me.smtpParams.host;
		me.smtpTestParams.port = me.smtpParams.port;
		me.smtpTestParams.password = me.smtpParams.password;
		me.smtpTestParams.user = me.smtpParams.user;

		if(value == '' || value == undefined) {
			me.recvEmailError = "请输入测试邮箱。";
			me.hasrecvEmailError = true;
		} else {
			let body = JSON.stringify(me.smtpTestParams);
			this.openAPIService.postPromise(url,body,name,true)
			  .then(
			    smtpRes => {
			    	me.testSuc = true;//测试是否有结果
			    	me.testSMTPResul = 'hei';//测试是否有结果
			    	if(smtpRes == '') {
			    		me.testSMTPRes = true;
			    		me.hasrecvEmailError =false;
			    	} else {
			    		me.testSMTPRes = false;
			    	}
			    	if(smtpRes) {
			    		me.testSMTPResErr = smtpRes;

			    	}
			    },
			    error => {
			      	me.testSMTPRes = 'hei';//测试结果
			      	me.testSMTPResul = 'hei';//测试结果
			      	me.testSuc = true;//测试是否有结果
			        this.error = error;
			        this.promptEmitService.change.emit(this.translate.instant(this.error));
			    }
			  )
			 me.setTimeInit('test','testTimeout');
		}

	}

	/**
	 * 取消按钮
	 */
	cancelSave(): void {
	  let me = this;
	  me.testSMTPRes = 'hei';//测试结果
	  me.hostError = '';//SMTP服务器地址
	  me.portError = '';//SMTP服务器端口号
	  me.passwordError = '';//用户密码
	  me.userError = '';//发送邮箱
	  // me.recvEmailError = '';//测试邮箱
	  if(!me.smtpGetParams) {//如果后台SMTP参数不存在，则取初始值
	  	me.smtpParams = {
	 		"host": "",//SMTP服务器地址
	 		"password": "",//用户密码
	 		"port": 25,//SMTP服务器端口号
	 		"user": "",//发送邮箱
	 		"emails": []//测试邮箱
	 	};
	  } else {
	  	// me.smtpParams = me.smtpGetParams;
	  	 me.getSMTP();
       //me.smtpParams = me.smtpGetParams;
     // me.getSMTP();
	  }
	}

	/**
	 * 格式检测
	 */

	myFunction (event:any){
	    this.saveSuc = false;//保存否成功
	}


	// onkeypress(event:any,value:any){
	// 	let me = this;
	// 	me.inputValue = value;
	// 	me.inputType = event.target.id;
	// }

	onKeyup(event:any,value:any){
   		let me = this;
   		let key = event.key;
   		let str = String(value);
   		let keyLast = str.charAt(str.length - 1);
   		let type =  event.target.id;
   		// if(key !== keyLast) {
   		// 	return;
   		// } else {

   		// }
   		let valueTrm = String(value).trim();
   		let valueLen = unescape(encodeURIComponent(valueTrm)).length;
   		const smtpParams = me.smtpParams;
   		me.testSMTPRes = 'hei';//测试结果

		if(type == 'host'){
			me.hostError = "";
			let reg = /^[A-Za-z0-9.\-_]+$/gi
			//1.SMTP地址为空
			if(value == '' || value == undefined) {
				me.hostError = "请输入SMTP地址。";

			} else
			//2.SMTP地址格式错误
			if(valueLen > 30 || valueLen < 3 || reg.test(value) == false) {
				me.hostError = '邮件服务器只能包含3-30位字符，支持英文、数字及.-_字符。';
			}

   		} else if(type == 'port'){
			me.portError = "";
			let reg = /^[0-9]*[1-9][0-9]*$/gi
			//a. SMTP端口为空：请输入端口。
			if(value == '' || value == undefined) {
				me.portError = "请输入端口。";
			} else
			//b. 为负数、小数、非数字字符，或者输入数字大于65535时
			if(value > 65535 || value < 1 || reg.test(value) == false){
				me.portError = "端口必须为小于65535的正整数。";
			}
   		} else if(type == 'user') {
   			me.userError = "";
	   		let reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,128}$/gi
	   		//a. 邮件地址为空
	   		if(value == '' || value == undefined) {
	   			me.userError = "请输入邮件地址。";

	   		} else
	   		//b. 邮件地址格式错误
	   		if(value > 65535 || value < 1 || reg.test(value) == false){
	   		    me.userError = "Email地址只能由英文字母、数字及特殊字符@.-_组成。";

	   		}
   		} else if(type == 'password') {
   			me.passwordError = "";
	   		//a. 邮件地址为空
	   		if(value == '' || value == undefined) {
	   			me.passwordError = "请输入邮件密码。";


	   		}
   		}
	   	if(type == 'recvEmail') {
	   		me.recvEmailError = "";
	   		me.testSMTPRes = 'hei';//测试结果
	   		let reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,128}$/gi
	   		//a. 测试邮箱为空
	   		if(value == '' || value == undefined) {
	   			me.recvEmailError = "";
	   			me.hasrecvEmailError = true;
	   		} else
	   		//b. 测试邮箱格式错误
	   		if(value > 65535 || value < 1 || reg.test(value) == false){
	   		    me.recvEmailError = "Email地址只能由英文字母、数字及特殊字符@.-_组成。";
	   		    me.hasrecvEmailError = true;
	   		} else {
	   			me.hasrecvEmailError = false;
	   		}

	   	}

	   	if(me.hostError !== '' || me.portError !== '' || me.userError !=='' || me.passwordError !=='') {
	   		me.hasError = true;
	   	} else {
	   		me.hasError = false;
	   	}


   	}




}


