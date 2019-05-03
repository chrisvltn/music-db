(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{145:function(t,e,r){"use strict";var n=r(156),a=r(8),i=r.n(a),s=r(15),u=r(149),c={axios:r.n(u).a.create(),getArtistByArtistName:function(){var t=Object(s.a)(i.a.mark(function t(e){var r,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.axios.get("/search.php",{params:{s:e}});case 2:if(r=t.sent,(n=r.data).artists){t.next=6;break}return t.abrupt("return",null);case 6:return t.abrupt("return",c.apiArtistToArtist(n.artists[0]));case 7:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),getArtistAlbumsByArtistName:function(){var t=Object(s.a)(i.a.mark(function t(e){var r,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.axios.get("/searchalbum.php",{params:{s:e}});case 2:return r=t.sent,n=r.data,t.abrupt("return",(n.album||[]).filter(function(t,e){return n.album.findIndex(function(e){return e.idAlbum===t.idAlbum})===e}).map(c.apiAlbumToAlbum).sort(function(t,e){return t.year<e.year?1:t.year>e.year?-1:0}));case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),getArtistTopTracksByArtistName:function(){var t=Object(s.a)(i.a.mark(function t(e){var r,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.axios.get("/track-top10.php",{params:{s:e}});case 2:return r=t.sent,n=r.data,t.abrupt("return",(n.track||[]).filter(function(t,e){return n.track.findIndex(function(e){return e.idTrack===t.idTrack})===e}).map(c.apiTracktoTrack));case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),getTrendingAlbums:function(){var t=Object(s.a)(i.a.mark(function t(){var e,r;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.axios.get("/trending.php",{params:{country:"us",type:"itunes",format:"albums"}});case 2:return e=t.sent,r=e.data,t.abrupt("return",(r.trending||[]).filter(function(t,e){return r.trending.findIndex(function(e){return e.idAlbum===t.idAlbum})===e}).map(c.apiTrendingToAlbum));case 5:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),getTrendingSingles:function(){var t=Object(s.a)(i.a.mark(function t(){var e,r;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.axios.get("/trending.php",{params:{country:"us",type:"itunes",format:"singles"}});case 2:return e=t.sent,r=e.data,t.abrupt("return",(r.trending||[]).filter(function(t,e){return r.trending.findIndex(function(e){return e.idTrack===t.idTrack})===e}).map(c.apiTrendingToAlbum));case 5:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),getAlbumTracksByAlbumId:function(){var t=Object(s.a)(i.a.mark(function t(e){var r,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.axios.get("/track.php",{params:{m:e}});case 2:return r=t.sent,n=r.data,t.abrupt("return",(n.track||[]).filter(function(t,e){return n.track.findIndex(function(e){return e.idTrack===t.idTrack})===e}).sort(function(t,e){return(parseInt(t.intTrackNumber)||0)-parseInt(e.intTrackNumber)||0}).sort(function(t,e){return(parseInt(t.intCD)||0)-parseInt(e.intCD)||0}).map(c.apiTracktoTrack));case 5:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),getAlbumByArtistNameAndAlbumTitle:function(){var t=Object(s.a)(i.a.mark(function t(e,r){var n,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.axios.get("/searchalbum.php",{params:{s:e,a:r}});case 2:if(n=t.sent,(a=n.data).album){t.next=6;break}return t.abrupt("return",null);case 6:return t.abrupt("return",c.apiAlbumToAlbum(a.album[0]));case 7:case"end":return t.stop()}},t)}));return function(e,r){return t.apply(this,arguments)}}(),apiTrendingToAlbum:function(t){return{id:t.idAlbum,title:t.strAlbum,year:"",images:{thumb:t.strAlbumThumb,cover:{front:t.strAlbumThumb,back:"",spine:""}},artist:{id:t.idArtist,name:t.strArtist,formedYear:"",style:"",images:{thumb:t.strArtistThumb,wide:""}}}},apiTracktoTrack:function(t){return{id:t.idTrack,title:t.strTrack,duration:parseInt(t.intDuration),number:parseInt(t.intTrackNumber),youtubeLink:t.strMusicVid,album:{id:t.idAlbum,title:t.strAlbum,year:"",images:{thumb:t.strTrackThumb,cover:{front:t.strTrackThumb,back:"",spine:""}},artist:{id:t.idArtist,name:t.strArtist,style:t.strStyle,formedYear:"",images:{thumb:"",wide:""}}}}},apiAlbumToAlbum:function(t){return{id:t.idAlbum,title:t.strAlbum,year:t.intYearReleased,images:{thumb:t.strAlbumThumb,cover:{front:t.strAlbumThumbHQ||t.strAlbumThumb,back:t.strAlbumThumbBack,spine:t.strAlbumSpine}},artist:{id:t.idArtist,name:t.strArtist,style:t.strStyle,formedYear:"",images:{thumb:"",wide:""}}}},apiArtistToArtist:function(t){return{name:t.strArtist,id:t.idArtist,formedYear:t.intFormedYear||t.intBornYear,style:t.strStyle||t.strGenre,images:{thumb:t.strArtistThumb,wide:t.strArtistWideThumb||t.strArtistBanner||t.strArtistClearart||t.strArtistFanart||t.strArtistFanart2||t.strArtistFanart3}}}};c.axios.defaults.baseURL="https://theaudiodb.com/api/v1/json/195003/",c.axios.defaults.paramsSerializer=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.entries(t).map(function(t){var e=Object(n.a)(t,2),r=e[0],a=e[1];return[encodeURIComponent(r),encodeURIComponent((a||"").toString())].join("=")}).join("&")},e.a=c},146:function(t,e,r){"use strict";var n=r(18),a=r.n(n),i=r(38),s=a()("p")({display:"block",textAlign:"center",fontSize:14,color:"#BDBDBD",lineHeight:1,margin:{top:10}});e.a=Object(i.a)(s)},147:function(t,e,r){"use strict";var n=r(18),a=r.n(n)()("div")({"@media (max-width: 650px)":{display:"flex",whiteSpace:"nowrap",overflowX:"auto"}});e.a=a},148:function(t,e,r){"use strict";var n=r(0),a=r.n(n),i=r(11),s=r(10),u=r.n(s),c=r(153),o=r.n(c);e.a=u()({card:{display:"inline-block",padding:[0,5],minWidth:150,width:150,verticalAlign:"top",cursor:"pointer"},image:{display:"block",width:"auto",height:"auto",minHeight:150,maxHeight:150,maxWidth:"100%",margin:{bottom:10}},title:{textAlign:"center",fontSize:14,color:"#ecf0f1",whiteSpace:"normal"}})(function(t){var e=t.classes,r=t.title,n=t.image,s=t.link,u=!n||n.indexOf("upload_icon")>-1?o.a:n;return a.a.createElement(i.b,{className:e.card,to:s},a.a.createElement("img",{className:e.image,src:u,alt:r}),a.a.createElement("h3",{className:e.title},r))})},151:function(t,e,r){"use strict";var n=r(18),a=r.n(n)()("h2")({display:"block",color:"#ecf0f1",fontWeight:"bold",fontSize:16,lineHeight:"44px",padding:0,margin:{top:0,bottom:5,left:0,right:0}});e.a=a},152:function(t,e,r){"use strict";var n=r(0),a=r.n(n),i=r(10),s=r.n(i),u=r(147),c=r(148);e.a=s()({wrapper:{textAlign:"center"}})(function(t){var e=t.classes,r=t.list,n=t.horizontal,i=r.map(function(t){return a.a.createElement(c.a,{key:t.id,link:"/artist/".concat(t.artist.name,"/album/").concat(t.title),title:t.title,image:t.images.thumb})});return n?a.a.createElement(u.a,null,i):a.a.createElement("div",{className:e.wrapper},i)})},153:function(t,e,r){t.exports=r.p+"static/media/thumb-placeholder.57cd97e6.png"},187:function(t,e,r){"use strict";r.r(e);var n=r(8),a=r.n(n),i=r(157),s=r(15),u=r(33),c=r(34),o=r(36),l=r(35),m=r(37),p=r(0),d=r.n(p),b=r(3),f=r(10),h=r.n(f),g=r(41),v=r(145),A=r(151),y=r(32),k=r(39),T=r(147),w=r(31),x=r(152),S=function(t){function e(){var t,r;Object(u.a)(this,e);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(r=Object(o.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(a)))).state={value:""},r}return Object(m.a)(e,t),Object(c.a)(e,[{key:"onFormSubmit",value:function(t){t.preventDefault(),this.props.onSubmit(this.state.value)}},{key:"onInputChange",value:function(t){this.setState({value:t.target.value})}},{key:"render",value:function(){var t=this.props.classes;return d.a.createElement("div",null,d.a.createElement("form",{onSubmit:this.onFormSubmit.bind(this),className:t.form},d.a.createElement("label",{className:t.label},d.a.createElement("i",{className:"fa fa-search "+t.icon}),d.a.createElement("input",{className:t.input,type:"text",placeholder:"Search",value:this.state.value,onChange:this.onInputChange.bind(this)})),d.a.createElement("button",{hidden:!0,type:"submit"})))}}]),e}(p.Component),j=h()({form:{display:"block"},input:{display:"block",lineHeight:"40px",height:40,width:"100%",fontSize:16,borderRadius:10,backgroundColor:"rgba(255, 255, 255, .3)",border:0,color:"#ecf0f1",outline:"none",padding:{top:0,right:10,bottom:0,left:35},"&::placeholder":{color:"#ecf0f1"}},label:{display:"block",position:"relative"},icon:{position:"absolute",fontSize:14,display:"block",top:13,left:10,color:"#ecf0f1"}})(S),O=r(148),E=r(146),I=r(40),N=function(t){function e(){var t,r;Object(u.a)(this,e);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(r=Object(o.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(a)))).state={recentlyViewed:{list:[],isLoading:!0},trendingAlbums:{list:[],isLoading:!0,error:null},trendingSingles:{list:[],isLoading:!0,error:null}},r}return Object(m.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.getTrendingAlbums(),this.getTrendingSingles(),this.getRecentlyViewed()}},{key:"getTrendingAlbums",value:function(){var t=Object(s.a)(a.a.mark(function t(){var e,r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.setState({trendingAlbums:Object(i.a)({},this.state.trendingAlbums,{list:[],isLoading:!0})}),e=null,r=[],t.prev=3,t.next=6,v.a.getTrendingAlbums();case 6:r=t.sent,t.next=12;break;case 9:t.prev=9,t.t0=t.catch(3),e="Sorry, we couldn't get the trending albums, please try again later.";case 12:this.setState({trendingAlbums:Object(i.a)({},this.state.trendingAlbums,{error:e,isLoading:!1,list:r})});case 13:case"end":return t.stop()}},t,this,[[3,9]])}));return function(){return t.apply(this,arguments)}}()},{key:"getTrendingSingles",value:function(){var t=Object(s.a)(a.a.mark(function t(){var e,r;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.setState({trendingSingles:Object(i.a)({},this.state.trendingSingles,{list:[],isLoading:!0})}),e=null,r=[],t.prev=3,t.next=6,v.a.getTrendingSingles();case 6:r=t.sent,t.next=12;break;case 9:t.prev=9,t.t0=t.catch(3),e="Sorry, we couldn't get the trending singles, please try again later.";case 12:this.setState({trendingSingles:Object(i.a)({},this.state.trendingSingles,{error:e,isLoading:!1,list:r})});case 13:case"end":return t.stop()}},t,this,[[3,9]])}));return function(){return t.apply(this,arguments)}}()},{key:"getRecentlyViewed",value:function(){var t=Object(s.a)(a.a.mark(function t(){var e;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.setState({recentlyViewed:{list:[],isLoading:!0}}),t.next=3,g.a.list();case 3:e=t.sent,this.setState({recentlyViewed:{list:e,isLoading:!1}});case 5:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=this.state.recentlyViewed,r=this.state.trendingAlbums,n=this.state.trendingSingles,a=this.props,i=a.thumb,s=a.classes;return d.a.createElement(y.a,{backgroundImage:i},d.a.createElement(w.a,null,d.a.createElement("div",{className:s.home},d.a.createElement(j,{onSubmit:function(e){return t.props.history.push("/artist/".concat(e))}}),e.list.length?d.a.createElement(d.a.Fragment,null,d.a.createElement(A.a,null,"Recently Viewed"),d.a.createElement(T.a,null,e.list.map(function(t){return d.a.createElement(O.a,{key:t.data.id,link:"album"===t.type?"/artist/".concat(t.data.artist.name,"/album/").concat(t.data.title):"/artist/".concat(t.data.name),title:"album"===t.type?t.data.title:t.data.name,image:t.data.images.thumb})}))):null,d.a.createElement(A.a,null,"Trending albums"),d.a.createElement(k.a,{show:r.isLoading}),d.a.createElement(x.a,{horizontal:!0,list:r.list}),d.a.createElement(E.a,{show:!!r.error&&!r.isLoading},r.error),d.a.createElement(A.a,null,"Trending singles"),d.a.createElement(k.a,{show:n.isLoading}),d.a.createElement(x.a,{horizontal:!0,list:n.list}),d.a.createElement(E.a,{show:!!n.error&&!n.isLoading},n.error))))}}]),e}(p.Component);e.default=h()({home:{paddingTop:60,"&":"\n\t\t\tpadding-top: calc(env(safe-area-inset-top) + 60px);\n\t\t"}})(Object(b.f)(Object(I.a)(N)))}}]);
//# sourceMappingURL=5.e21f657c.chunk.js.map