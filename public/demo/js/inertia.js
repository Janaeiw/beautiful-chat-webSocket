/**
 * @description: 屏幕滚动吸附盒子
 * @param {document} global
 * @param {*} factory
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/07 10:26
 */

eval(
  (function (e, f, a, d, c, g) {
    c = function (b) {
      return (
        (b < f ? "" : c(parseInt(b / f))) +
        (35 < (b %= f) ? String.fromCharCode(b + 29) : b.toString(36))
      );
    };
    if (!"".replace(/^/, String)) {
      for (; a--; ) g[c(a)] = d[a] || c(a);
      d = [
        function (b) {
          return g[b];
        }
      ];
      c = function () {
        return "\\w+";
      };
      a = 1;
    }
    for (; a--; )
      d[a] && (e = e.replace(new RegExp("\\b" + c(a) + "\\b", "g"), d[a]));
    return e;
  })(
    "(9(a,b){4(1h Q==='9'&&(Q.1w||Q.1x)){Q(b)}E{a.1y=b()}})(1z,9(){'1A 1B';3 C=9(l,m){3 n={1i:G,};3 o={};m=m||{};1C(3 p 1D n){4(1h m[p]!=='1E'){o[p]=m[p]}E{o[p]=n[p]}}3 q={8:0,6:0,};3 r=1F;3 s=r.1G;3 u=r.1H;4(!l){D}3 v=9(x,y){x=J.1j(R*x)/R;y=J.1j(R*y)/R;l.15.1I='1J('+[x+'S',y+'S'].T(',')+')';l.15.1K='1L('+[x+'S',y+'S',0].T(',')+')'};3 w='';4(l.U&&r.K&&(w=K['17'+l.U])){3 z=w.1M(',');l.8=+z[0];l.6=+z[1];v(l.8,l.6)}l.15.1N='1O';3 A=l.V();4(A.L<-0.5*A.W||A.X<-0.5*A.18||A.Y>s+0.5*A.W||A.19>u+0.5*A.18){l.8=0;l.6=0;v(0,0)}l.1a('1P',9(a){3 b=a.1k[0]||a;q.1b=b.1l;q.1c=b.1m;q.M=G;4(l.8){q.8=l.8}4(l.6){q.6=l.6}q.O=l.V();q.1d=G});3 B=9(t,b,c,d){4((t/=d)<1/2.I){D c*(7.Z*t*t)+b}E 4(t<2/2.I){D c*(7.Z*(t-=1.5/2.I)*t+0.I)+b}E 4(t<2.5/2.I){D c*(7.Z*(t-=2.1n/2.I)*t+0.1Q)+b}E{D c*(7.Z*(t-=2.1R/2.I)*t+0.1S)+b}};1o.1a('1T',9(a){4(q.M!==G){D}4(q.1d==G){q.1p=+1q 1r();q.1d=F}a.1U();3 b=a.1k[0]||a;q.11=b.1l;q.12=b.1m;3 c=q.11-q.1b,6=q.12-q.1c;3 d=q.O.L+c,13=q.O.X+6,1e=d+q.O.W,1f=13+q.O.18;4(d<0){c=c-d}4(13<0){6=6-13}4(1e>s){c=c-(1e-s)}4(1f>u){6=6-(1f-u)}3 x=q.8+c,y=q.6+6;v(x,y);l.8=x;l.6=y},{1V:F,},);1o.1a('1W',9(){4(q.M===F){D}q.M=F;q.1s=+1q 1r();4(!q.11||!q.12){D}3 e=q.11-q.1b,6=q.12-q.1c;4(J.1t(e)<5&&J.1t(6)<5){D}3 f=J.1X(e*e+6*6),1u=q.1s-q.1p;3 g=(f/1u)*16.1Y;3 h=J.1Z(10,g);q.P=G;3 i=1,N=1;3 j=9(){4(q.M==G){q.P=F;D}g=g-g/h;3 a=(i*g*e)/f,H=(N*g*6)/f;3 b=l.V();4(a<0&&b.L+a<0){a=0-b.L;i=i*-1}E 4(a>0&&b.Y+a>s){a=s-b.Y;i=i*-1}4(H<0&&b.X+H<0){H=-1*b.X;N=-1*N}E 4(H>0&&b.19+H>u){H=u-b.19;N=-1*N}3 x=l.8+a,y=l.6+H;v(x,y);l.8=x;l.6=y;4(g<0.1){g=0;4(o.1i==F){q.P=F;4(r.K){K['17'+l.U]=[x,y].T()}}E{k()}}E{1v(j)}};3 k=9(){3 a=0,1g=1n;3 b=l.8,y=l.6,14=0;3 c=l.V();4(c.L+c.W/2<s/2){14=-1*c.L}E{14=s-c.Y}3 d=9(){4(q.M==G){q.P=F;D}a++;3 x=B(a,b,14,1g);v(x,y);4(a<1g){1v(d)}E{l.8=x;l.6=y;q.P=F;4(r.K){K['17'+l.U]=[x,y].T()}}};d()};j()})};D C});",
    62,
    124,
    "   var if  distanceY  distanceX function                              return else false true moveY 75 Math localStorage left touching reverseY bound inertiaing define 1000 px join id getBoundingClientRect width top right 5625  nowX nowY absTop change style  Inertia_ height bottom addEventListener posX posY timerready absRight absBottom during typeof edge round touches pageX pageY 25 document timerstart new Date timerend abs time requestAnimationFrame amd cmd Inertia this use strict for in undefined window innerWidth innerHeight webkitTransform translate transform translate3d split visibility visible touchstart 9375 625 984375 touchmove preventDefault passive touchend sqrt 666 min".split(
      " "
    ),
    0,
    {}
  )
);
