(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{126:function(e,t,a){},144:function(e,t,a){e.exports=a(322)},149:function(e,t,a){},155:function(e,t){},157:function(e,t){},194:function(e,t){},195:function(e,t){},280:function(e,t,a){},282:function(e,t,a){},283:function(e,t,a){},315:function(e,t){},318:function(e,t,a){},319:function(e,t,a){},320:function(e,t,a){},321:function(e,t,a){},322:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(73),s=a.n(l),r=a(4),c=a(5),i=a(7),m=a(6),d=a(8),u=a(17),p=a(27),h=(a(149),a(22)),g=a.n(h),f=a(25),v=a(12),E=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={token:"",loggedIn:!1,showError:!1,showNullError:!1,creaderror:!1},a.changehandleremail=function(e){a.setState({email:e.target.value})},a.changehandlerpass=function(e){a.setState({password:e.target.value})},a.btn1handler=function(e){e.preventDefault(),console.log("cliking"),""===a.state.email||""===a.state.password?(console.log(a.state.email+"   "+a.state.password),console.log("wtf"),a.setState({loggedIn:!1,showError:!1,showNullError:!0})):(console.log("sending.............."),console.log(a.state.email+a.state.password),v.post("/api/login",{email:a.state.email,password:a.state.password}).then(function(e){console.log("awe mewwa - - -popopopopo"),console.log(e);var t=e.data;t?(console.log("body - "+t),localStorage.setItem("jwt",t.jwt),a.setState({loggedIn:!0,showError:!1,showNullError:!1})):a.setState({creaderror:!0})}).catch(function(e){g.a.toast({html:"Invalid Credentials"}),console.log("l>> err"+e),a.setState({loggedIn:!1,showError:!0,showNullError:!1,creaderror:!0})}))},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("jwt");console.log("comp mount"),console.log(e);try{var t=f.verify(e,"authdemo");t&&(console.log("loged in"),this.setState({loggedIn:!0,email:t.email}))}catch(a){console.log("not logged in"+a),this.setState({loggedIn:!1})}}},{key:"render",value:function(){var e=this.state,t=(e.email,e.password,e.showError,e.loggedIn);e.showNullError;return t?o.a.createElement(p.a,{to:"/dashboard"}):o.a.createElement("div",{className:"maindiv"},o.a.createElement("div",{className:"wrapper"},o.a.createElement("div",{className:"form-wrapper"},o.a.createElement("h1",null,"FCiD"),o.a.createElement("div",{className:"informm"},o.a.createElement("br",null),o.a.createElement("form",{onSubmit:this.btn1handler},o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{id:"email",required:!0,type:"email",name:"email",onChange:this.changehandleremail}),o.a.createElement("label",{for:"email"},"Email")),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,id:"pass",type:"password",name:"pass",onChange:this.changehandlerpass}),o.a.createElement("label",{for:"pass"},"Password")),o.a.createElement("div",{className:"submit"},o.a.createElement("input",{type:"submit",className:"btn  waves-light light-blue darken-3",value:"sign in",id:"submit"}))),this.state.creaderror&&o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"credeer"},"Invalid Creadentials")),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("div",null,o.a.createElement(u.b,{to:"/fogotpassword"},o.a.createElement("a",null,"Forgotten password")),o.a.createElement("br",null)),o.a.createElement("div",{className:"haveaccc"},"still dont have a account",o.a.createElement(u.b,{to:"/signup"},o.a.createElement("span",null," ")," ",o.a.createElement("a",null,"signup")))))))}}]),t}(n.Component),b=a(32),w=a(25),y=a.n(w),O=a(12),j=a.n(O),N=(a(280),function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={email:"",registered:!1,password1:"",password2:"",firstname:"",lastname:"",errorpassmatch:!1,duplicateemalifound:!1},a.changeHandler=function(e){a.setState(Object(b.a)({},e.target.id,e.target.value)),console.log(a.state)},a.submitHandler=function(e){e.preventDefault(),console.log(a.state);var t={headers:{authorization:localStorage.getItem("jwt")}},n=a.state.password1===a.state.password2;console.log(n),n?(a.setState({errorpassmatch:!1}),j.a.post("/api/signup",{email:a.state.email,password:a.state.password1,firstname:a.state.firstname,lastname:a.state.lastname},t).then(function(e){console.log("resonse came - -"),console.log(e.data),a.setState({registered:!0}),localStorage.setItem("jwt",e.data.jwt)}).catch(function(e){console.log(e),console.log(11e3==e.response.data),11e3==e.response.data&&a.setState({duplicateemalifound:!0})})):a.setState({errorpassmatch:!0})},a.chngehandlsel=function(e){a.setState({usertype:e.target.value})},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("jwt");console.log("jwt token -- - -- >>>"+e);try{console.log("in register");var t=y.a.verify(e,"authdemo");console.log("payload - "+t),console.log("************************************"),this.props.history.push("/dashboard")}catch(a){console.log("not logged in redirecting...............")}}},{key:"render",value:function(){return!1===this.state.registered?o.a.createElement("div",null,o.a.createElement("div",{className:"maindiv"},o.a.createElement("div",{className:"wrapper"},o.a.createElement("div",{className:"form-wrapper"},o.a.createElement("h1",null,"FCiD"),o.a.createElement("div",{className:"informmm"},o.a.createElement("form",{onSubmit:this.submitHandler},this.state.errorpassmatch&&o.a.createElement("div",{class:"alert alert-warning",role:"alert"},"password does not match"),this.state.duplicateemalifound&&o.a.createElement("div",{class:"alert alert-warning",role:"alert"},"Duplicate email Found"),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"email",id:"email",onChange:this.changeHandler}),o.a.createElement("label",{for:"email"},"Email")),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"text",id:"firstname",onChange:this.changeHandler}),"  ",o.a.createElement("label",{for:"firstname"},"Firstname")),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"text",id:"lastname",onChange:this.changeHandler}),o.a.createElement("label",{for:"lastname"},"Lastname")),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"password",id:"password1",onChange:this.changeHandler}),o.a.createElement("label",{for:"password1"},"Password")),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"password",id:"password2",onChange:this.changeHandler}),o.a.createElement("label",{for:"password2"},"Confirm Password")),o.a.createElement("div",{class:"form-group"}),o.a.createElement("input",{type:"submit",class:"btn btn-primary",value:"Sign Up",id:"submitbtn"})),o.a.createElement("div",{className:"haveacc"},"Have an account?",o.a.createElement(u.b,{to:"/login"},o.a.createElement("span",null," ")," ",o.a.createElement("a",null,"login")))))))):o.a.createElement(p.a,{to:"/dashboard"})}}]),t}(n.Component)),S=(a(126),a(281)),k=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={id:null,thumbsicon:!1,fromNow:null},a.upvote=function(){console.log("up"),console.log("id - "+a.props.id),console.log(a.state),!1===a.state.thumbsicon&&(a.setState({thumbsicon:!0}),a.props.upvote(a.props.id))},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){if(this.props.time)var e=this.props.time.slice(4,24),t=S(e,"MMM-DD-YYYY HH:mm:ssZ").fromNow();return o.a.createElement("div",{className:"postcard"},o.a.createElement("div",null,o.a.createElement("div",{className:"card horizontal"},o.a.createElement("div",{className:"card-stacked"},o.a.createElement("h4",{className:"cardheader"},this.props.name," ",o.a.createElement("span",{className:"fromnow"},t)," "),o.a.createElement("div",{className:"card-content"},o.a.createElement("p",{className:"cardcontent"},this.props.content)),o.a.createElement("div",null),o.a.createElement("div",null,o.a.createElement("div",{className:"votes"},o.a.createElement("span",{className:"upvotecount"},this.props.upvotescount),o.a.createElement("a",{hidden:this.props.thisUserUpVoted},o.a.createElement("i",{onClick:this.upvote,id:"up",className:"far fa-thumbs-up fa-2x"})),o.a.createElement("a",{hidden:!this.props.thisUserUpVoted},o.a.createElement("i",{class:"fas fa-thumbs-up fa-2x",onClick:this.upvote,id:"up"}))))))))}}]),t}(n.Component),C=Object(p.e)(k);n.Component,a(282);a(283);var I=Object(p.e)(function(e){return o.a.createElement("nav",null,o.a.createElement("div",{id:"nav",className:"nav-wrapper grey darken-3"},o.a.createElement("a",{href:"/",id:"navlogo",class:"brand-logo left"},"FCiD"),o.a.createElement("ul",{id:"nav-mobile",class:"right hide-on-med-and-down "},o.a.createElement("li",null,o.a.createElement("a",{href:"/dashboard"},"Dashboard")),o.a.createElement("li",null,o.a.createElement("a",{href:"/login"},"Login")),o.a.createElement("li",null,o.a.createElement("a",{href:"/signup"},"register")),o.a.createElement("li",null,o.a.createElement("a",{onClick:function(t){console.log("loggeeeeeeee"),localStorage.removeItem("jwt"),e.history.push("/login")}},"logout")))))}),M=a(34),x=a.n(M),H=a(143),D=a.n(H),q=a(25),A={content:{width:"50%",height:"50%",top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}},U=D()("http://127.0.0.1:3001",{transports:["websocket"],upgrade:!1});x.a.setAppElement("#root");var _=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={logedin:!0,email:"",id:"",firstName:"",lastName:"",content:"",usertype:"",emailverified:!1,modalIsOpen:!1,posts:[],upvoted:[],downvoted:[]},a.openModal=function(){a.setState({modalIsOpen:!0})},a.changeHandlercontent=function(e){a.setState({content:e.target.value})},a.afterOpenModal=function(){a.subtitle.style.color="#f00",a.subtitle.style.textAlign="center"},a.closeModal=function(){a.setState({modalIsOpen:!1})},a.verifyemail=function(){j.a.post("/usr/sendconfirmemail/"+a.state.id).then(function(e){console.log(e)}).catch(function(e){console.log(e)})},a.greet=function(){var e=(new Date).getHours();console.log(e),e>18&&e<23?a.setState({greet:"Good night"}):e>16&&e<18?a.setState({greet:"Good evening"}):e>12&&e<16?a.setState({greet:"Good afternoon"}):a.setState({greet:"Good morning"})},a.upvoteprop=function(e){console.log("only i upvoted post");for(var t={postid:e,jwt:localStorage.getItem("jwt")},n=a.state.posts,o=0;o<n.length;o++)if(n[o]._id===e){n[o].thisUserUpVoted=!0,n[o].up=n[o].up+1;break}U.emit("newupvote",t),a.setState({posts:n})},a.addpost=function(e){e.preventDefault(),console.log(a.state);var t=localStorage.getItem("jwt");console.log(t);var n={firstName:a.state.firstName,content:a.state.content,jwt:t};U.emit("newpost",n),U.on("newposterror",function(e){g.a.toast({html:"Error Ocurred"}),console.log("error post emit fired "+e)}),a.closeModal()},a.fetchPosts=function(){var e=localStorage.getItem("jwt");console.log(e);var t={headers:{authorization:e}};j.a.get("/api/getposts",t).then(function(e){a.setState(),console.log(e.data),a.setState({posts:e.data})}).catch(function(e){console.log(e)})},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.greet(),console.log("mount");var t=localStorage.getItem("jwt");new Date;console.log(t);try{q.verify(t,"authdemo")&&this.setState({logedin:!0})}catch(n){this.props.history.push("/login"),console.log(n),g.a.toast({html:"Session Expired"})}this.fetchPosts(),U.on("newpost",function(t){var a=e.state.posts;console.log("added new post somewhere - 0================="+JSON.stringify(t)),a.unshift(t),e.setState({posts:a}),console.log(e.state.posts)}),U.on("newupvote",function(t){if(console.log("someone upvoted"+JSON.stringify(t)),localStorage.getItem("userId")!=t.userId){g.a.toast({html:t.name+" upvoted a post just now "});var a=e.state.posts;console.log("post arr - "+a.length);for(var n=0;n<a.length;n++)a[n]._id===t.postid&&(a[n].up=t.updatepost.up),e.setState({posts:a})}setTimeout(function(){console.log(e.state.posts)},1e3)}),U.on("newupvoteerror",function(e){console.log("error upvoted"+JSON.stringify(e)),"cannot_upvote_twice"===e.content&&g.a.toast({html:"Cannot upvote an upvoted post"})});var a={headers:{authorization:t}};j.a.get("/api/dashboard",a).then(function(t){console.log("sucsess"+t.data),t.data?(console.log("menna apu data"),console.log(t.data),e.setState({email:t.data.email,emailverified:t.data.emailverified,id:t.data._id,firstName:t.data.firstName,lastName:t.data.lastName}),e.setState({logedin:!0}),console.log(e.state),localStorage.setItem("userId",t.data._id)):e.setState({logedin:!1})}).catch(function(t){e.setState({logedin:!1}),console.log("error"+t)})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(I,null),o.a.createElement("div",{class:"row"},o.a.createElement("div",{className:"maindash"}),o.a.createElement("a",{onClick:this.openModal,id:"addbtn",class:"btn-floating btn-large light-blue darken-3 pulse"},o.a.createElement("i",{class:"fas fa-plus fa-3x"})),o.a.createElement(x.a,{isOpen:this.state.modalIsOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,style:A,contentLabel:"Example Modal"},o.a.createElement("h2",{ref:function(t){return e.subtitle=t}},"Add Story"),o.a.createElement("form",{onSubmit:this.addpost},o.a.createElement("div",{class:"input-field col s12"},o.a.createElement("textarea",{id:"textarea1",onChange:this.changeHandlercontent,class:"materialize-textarea"}),o.a.createElement("label",{id:"postlable",for:"textarea1"},"What's Happening ?")),o.a.createElement("div",{className:"submit"},o.a.createElement("input",{type:"submit",className:"btn  waves-light light-blue darken-3",value:"Post",id:"submit"})))),o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"greet"},o.a.createElement("h1",null,"hello ",this.state.firstName)),this.state.posts.map(function(e,t){return console.log("test"),o.a.createElement(C,{key:t,upvotescount:e.up,name:e.firstName,id:e._id,content:e.content,upvote:this.upvoteprop,time:e.date,thisUserUpVoted:e.thisUserUpVoted})}.bind(this)))))}}]),t}(n.Component),F=(a(318),function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={email:"",errnotfound:!1,succsee:!1},a.changeHandler=function(e){a.setState(Object(b.a)({},e.target.id,e.target.value))},a.btn1handler=function(e){e.preventDefault(),console.log("inform"),j.a.post("/api/fogotpassword",{email:a.state.email}).then(function(e){console.log(e),console.log(e.data),"no_user_found"===e.data?(console.log("no user found "),a.setState({errnotfound:!0})):(console.log("email send successfullly"),a.setState({succsee:!0}))}).catch(function(e){console.log(e)})},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return this.state.errnotfound?o.a.createElement("div",null,o.a.createElement("br",null),o.a.createElement("h1",null," please check your email and try again ")):this.state.succsee?o.a.createElement("h1",{color:"primary",role:"alert"},o.a.createElement("br",null),o.a.createElement("h1",null," reset link set to your email ")):o.a.createElement("div",{className:"maindiv"},o.a.createElement("div",{className:"wrapper"},o.a.createElement("div",{className:"informforgot"},o.a.createElement("div",{className:"forgotfrm"},o.a.createElement("i",{id:"padlock",class:"fas fa-lock fa-5x"}),o.a.createElement("h3",null,"we all forget and that's cool "),o.a.createElement("h5",null," ","Enter your email and we'll send",o.a.createElement("br",null),"you a link to get back into your account."),o.a.createElement("form",{onSubmit:this.btn1handler},o.a.createElement("br",null),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"email",name:"email",id:"email",onChange:this.changeHandler}),o.a.createElement("label",{for:"email"},"email")),o.a.createElement("br",null),o.a.createElement("input",{type:"submit",className:"btn",value:"Send password reset email",id:"submitbtnnn"}))))))}}]),t}(n.Component)),L=(a(319),a(25)),P=a(12),z=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={id:"",pass1:"",pass2:"",passchangeok:!1,massmissmatch:!1,exp:!1},a.changeHandler=function(e){a.setState(Object(b.a)({},e.target.id,e.target.value))},a.redirectlogin=function(){a.props.history.push("/login")},a.submithandler=function(e){e.preventDefault(),console.log("passs - "+a.state.pass1+"idd -- "+a.state.id),a.state.pass1===a.state.pass2?(a.setState({massmissmatch:!1}),P.post("/api/resetpassword/".concat(a.state.id),{password:a.state.pass1}).then(function(e){console.log(e.data),"password changed succesfully"===e.data&&(a.setState({passchangeok:!0}),setTimeout(function(){a.redirectlogin()},5e3))}).catch(function(e){console.log(e)})):a.setState({massmissmatch:!0})},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;try{var t=L.verify(this.props.match.params.id,"authdemo");console.log(t.id),console.log(t.id),this.setState({id:t.id})}catch(a){this.setState({exp:!0}),console.log(a),setTimeout(function(){e.props.history.push("/login")},2e3)}}},{key:"render",value:function(){return this.state.exp?o.a.createElement("div",null,o.a.createElement("h1",null," Link expired ")):o.a.createElement("div",null,this.state.massmissmatch&&o.a.createElement("div",{class:"passmissmatch"},"password does not match"),o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"respassheader"}," reset your password "),o.a.createElement("form",{onSubmit:this.submithandler},o.a.createElement("div",{className:"formresetpass"},o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"password",id:"pass1",onChange:this.changeHandler}),o.a.createElement("label",{for:"pass1"},"new password")),o.a.createElement("div",{className:"input-field"},o.a.createElement("input",{required:!0,type:"password",id:"pass2",onChange:this.changeHandler}),o.a.createElement("label",{for:"pass2"},"re enter new password"))),o.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"reset password"})),!0===this.state.passchangeok&&o.a.createElement("div",null," ",o.a.createElement("h1",null,"password changed succesfully")," "))))}}]),t}(n.Component),J=a(25),V=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(o)))).state={sucsess:!1,exp:!1},a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("token - "+this.props.match.params.id);try{var t=J.verify(this.props.match.params.id,"authdemo");console.log(t),j.a.post("/usr/confirmemail/"+t.id).then(function(t){e.setState({sucsess:!0}),console.log(t)}).catch(function(t){e.setState({sucsess:!1}),console.log(t)})}catch(a){this.setState({exp:!0}),console.log(a)}}},{key:"render",value:function(){return this.state.sucsess?this.state.exp?o.a.createElement("div",null):void 0:o.a.createElement("div",null)}}]),t}(n.Component),G=a(23),R={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};x.a.setAppElement("#root");var Y=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).state={modalIsOpen:!1},e.openModal=e.openModal.bind(Object(G.a)(Object(G.a)(e))),e.afterOpenModal=e.afterOpenModal.bind(Object(G.a)(Object(G.a)(e))),e.closeModal=e.closeModal.bind(Object(G.a)(Object(G.a)(e))),e}return Object(d.a)(t,e),Object(c.a)(t,[{key:"openModal",value:function(){this.setState({modalIsOpen:!0})}},{key:"afterOpenModal",value:function(){this.subtitle.style.color="#f00"}},{key:"closeModal",value:function(){this.setState({modalIsOpen:!1})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("button",{onClick:this.openModal},"Open Modal"),o.a.createElement(x.a,{isOpen:this.state.modalIsOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,style:R,contentLabel:"Example Modal"},o.a.createElement("h2",{ref:function(t){return e.subtitle=t}},"Hello"),o.a.createElement("button",{onClick:this.closeModal},"close"),o.a.createElement("div",null,"I am a modal"),o.a.createElement("form",null,o.a.createElement("input",null),o.a.createElement("button",null,"tab navigation"),o.a.createElement("button",null,"stays"),o.a.createElement("button",null,"inside"),o.a.createElement("button",null,"the modal"))))}}]),t}(o.a.Component),T=(a(320),n.Component,function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(u.a,null,o.a.createElement(p.b,{exact:!0,path:"/",component:E}),o.a.createElement(p.b,{path:"/dashboard",component:_}),o.a.createElement(p.b,{path:"/signup",component:N}),o.a.createElement(p.b,{path:"/Login",component:E}),o.a.createElement(p.b,{path:"/fogotpassword",component:F}),o.a.createElement(p.b,{path:"/resetpassword/:id",component:z}),o.a.createElement(p.b,{path:"/confirmemail/:id",component:V}),o.a.createElement(p.b,{path:"/confirmemail/:id",component:V}),o.a.createElement(p.b,{path:"/mod",component:Y}))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(321);s.a.render(o.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[144,1,2]]]);
//# sourceMappingURL=main.e6d80071.chunk.js.map