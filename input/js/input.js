//require("../css/input_liv.css");
var React = require("react");
var ReactDom = require("react-dom");


var userNameReg = /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/,
    mobilePhoneReg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/g,
    emailReg = /^(\w)+(\.\w+)*@([\w-])+((\.\w+)+)$/g,
    passwordReg = /^1[3|4|5|7|8]\d{9}$/,
    fixedPhoneReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}$/,
    idCardReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
    imgVerifiReg = /^.{4}$/,
    phoneVerifiReg = /^.{6}$/;

var InputLiv = React.createClass({
    init:function(){
        return {
//          ajaxURL: this.props.options.ajaxURL || "",
            verifiCode: this.props.options.verifiCode || "",
            labelName: this.props.options.labelName || "",
            placeHolder: this.props.options.placeHolder || "",
            disAbled: this.props.options.disAbled || "",
            maxLen: this.props.options.maxLen || 20,
            type: this.props.options.type || "text",
            ids: this.props.options.ids,
            reg: this.props.options.reg || ""
        }
    },
    
    componentDidMount: function () {
        var doc = document,
            input = doc.querySelector(".input-liv-inp"),
            label = doc.querySelector(".input-liv-label");
        this.init();
        input.setAttribute("maxlength",this.init().maxLen);
        input.setAttribute("placeholder",this.init().placeHolder);
        if(this.init().disAbled=="disabled"){
            input.setAttribute("disabled",this.init.disAbled);
        }
        if(this.init().labelName==""){
            label.setAttribute("class","hidden");
        }else{
            label.innerHTML = this.init().labelName;
        }
    },
    
    focus: function () {
        var doc = document,
            classN = "";
        doc.querySelector(".input-liv-inp").style.border = "1px solid #cdcdcd";
        classN = doc.querySelector(".input-liv-error").className.replace(" display", " hidden");
        doc.querySelector(".input-liv-error").className = classN;
    },
    
    blur: function () {
    	if(this.init().reg !=""){
    		this.regularVerification(this.init().reg);
    	}else{
    		var regType = this.init().type;
        	switch (regType) {
	            case 'verifiCode':
	                this.regularVerification(imgVerifiReg);
	                break;
	            case 'mobilePhone':
	                this.regularVerification(mobilePhoneReg);
	                break;
	            case 'email':
	                this.regularVerification(emailReg);
	                break;
	            case 'password':
	                this.regularVerification(passwordReg);
	                break;
	            case 'userName':
	                this.regularVerification(userNameReg);
	                break;
	            case 'fixedPhone':
	                this.regularVerification(fixedPhoneReg);
	                break;
	            case 'idCard':
	                this.regularVerification(idCardReg);
	                break;
	            case 'phoneNmailV':
	                this.regularVerification(phoneVerifiReg);
	                break;
	            default:
	            	this.regularVerification("");
	            	break;
	        }
    	}
    },
    
    regularVerification:function(reg){
        var doc = document,
            inp = doc.querySelector("#" + this.init().ids),
            label = doc.querySelector("#" + this.init().ids + "-label"),
            classN = "";
		/* 如果不符合正则验证则提示错误信息，符合正则规则则发送ajax请求服务器进行唯一性/有效性验证  */
        if (!(inp.value && reg.test(inp.value))) {
	        inp.style.border = "1px solid red";
	        classN = doc.querySelector(".input-liv-error").className.replace(" hidden", " display");
	        doc.querySelector(".input-liv-error").className = classN;
	        doc.querySelector(".input-liv-error span").innerHTML = label.innerHTML+"格式错误";
        }
//      else{
//      	if(this.init().ajaxURL != ""){
//      		$.get(
//      			this.init().ajaxURL,
//      			{data:data},
//      			function(res){
//      				inp.style.border = "1px solid red";
//	        			classN = doc.querySelector(".input-liv-error").className.replace(" hidden", " display");
//	        			doc.querySelector(".input-liv-error").className = classN;
//	        			doc.querySelector(".input-liv-error span").innerHTML = res.msg;
//      			}
//      		)
//      	}
//      }
    },
    
    render: function () {
        return (
        	<div className= "input-liv">
            {
                (this.init().labelName=="")?<label forHtml ={this.init().ids} className="input-liv-label hidden" id={this.init().ids+"-label"} ></label>:<label forHtml ={this.init().ids} className="input-liv-label" id={this.init().ids+"-label"} >{this.init().labelName}</label>
                }
	            <div className = "input-liv-package">
	                <input type="text" className = "input-liv-inp" id={this.init().ids} onBlur={this.blur} onFocus = {this.focus}/>
	                <div className = "input-liv-error hidden" >
                        <img src="./img/warning.png" /><span></span>
                    </div>
	            </div>
            {
                this.init().verifiCode==""?<div className = "input-liv-verifiCode hidden"></div>:<div className = "input-liv-verifiCode"><img src={this.init().verifiCode} /></div>
                }

	        </div>
        );
    }
});

module.exports = InputLiv;


//var op ={
//  ajaxURL:"index.html",
//  labelName:"管理中心编码",
//  type:"idCard",
//  verifiCode:'AJAX',
//  ids:"popupMcInp"
//}
//ReactDom.render(
//  <input-liv options={op} />,
//  document.getElementById("inputPanel")
//);



