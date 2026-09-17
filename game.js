const COLORS=["red","yellow","green","blue"];
const WORDS=["APPLE","TIGER","OCEAN","MOON","PIZZA","FOREST","STAR","RIVER","CLOUD","ROCKET","PEACH","COMET","BERRY","WHALE","MAPLE","CORAL","LANTERN","PEARL","FALCON","ISLAND"];
const $=id=>document.getElementById(id);
let state=null;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function makeDeck(){let cards=[];for(const color of COLORS){for(let i=0;i<2;i++)for(let j=0;j<10;j++)cards.push({id:crypto.randomUUID(),color,word:pick(WORDS),type:"word"});for(const type of ["skip","reverse","plus2"])for(let i=0;i<2;i++)cards.push({id:crypto.randomUUID(),color,type,word:type==="plus2"?"+2":type.toUpperCase()})}for(let i=0;i<4;i++){cards.push({id:crypto.randomUUID(),color:"wild",type:"wild",word:"WILD"},{id:crypto.randomUUID(),color:"wild",type:"plus4",word:"+4"})}return shuffle(cards)}
function startDemo(room){const deck=makeDeck();const players=[{id:"me",name:$("playerName").value.trim()||"Player 1",hand:deck.splice(0,7)},{id:"p2",name:"Player 2",hand:deck.splice(0,7)},{id:"p3",name:"Player 3",hand:deck.splice(0,7)}];state={room,deck,players,discard:deck.pop(),turn:0,direction:1,round:1};$("lobby").classList.add("hidden");$("game").classList.remove("hidden");$("roomLabel").textContent=room;$("connection").textContent="Local demo";render()}
function legal(card){const top=state.discard;return card.color==="wild"||card.color===top.color||card.word===top.word||card.type===top.type}
function play(index){const me=state.players[0];const card=me.hand[index];if(!legal(card)){msg("That card doesn't match the color or word.");return}me.hand.splice(index,1);state.discard=card;let penalty=card.type==="plus2"?2:card.type==="plus4"?4:0;if(penalty){for(let p=1;p<state.players.length;p++){for(let n=0;n<penalty;n++)drawTo(state.players[p]);}msg(`${card.word}! Every opponent received ${penalty} random cards.`)}else msg(`${card.word} played. Demo turn advanced.`);if(card.type==="reverse")state.direction*=-1;if(card.type==="skip")msg("SKIP played.");if(card.type==="wild"||card.type==="plus4"){const chosen=pick(COLORS);state.discard={...card,color:chosen};msg(`${card.word}: color changed to ${chosen}.`)}if(me.hand.length===0){msg("You won this demo round!");}render()}
function drawTo(player){if(!state.deck.length){msg("The draw pile is empty. Start a new round to reshuffle.");return}player.hand.push(state.deck.pop())}
function render(){const me=state.players[0];$("hand").innerHTML="";me.hand.forEach((c,i)=>{const b=document.createElement("button");b.className=`hand-card ${c.color}`;b.textContent=c.word;b.title=c.type==="word"?`${c.color} ${c.word}`:c.type;b.onclick=()=>play(i);$("hand").appendChild(b)});$("handCount").textContent=`${me.hand.length} cards`;$("discard").className=`playing-card ${state.discard.color}`;$("discard").innerHTML=`<span class="word">${state.discard.word}</span>`;$("opponents").innerHTML=state.players.slice(1).map(p=>`<div class="opponent"><b>${escapeText(p.name)}</b><small>${p.hand.length} cards</small></div>`).join("");}
function msg(s){$("message").textContent=s}
function escapeText(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("createBtn").onclick=()=>startDemo(Math.random().toString(36).slice(2,8).toUpperCase());
$("joinBtn").onclick=()=>{const code=$("roomCode").value.trim().toUpperCase();if(!code){msg("Enter a room code.");return}startDemo(code)};
$("drawBtn").onclick=()=>{drawTo(state.players[0]);render();msg("You drew a random card.")};
$("unoBtn").onclick=()=>msg(state.players[0].hand.length===1?"UNO!":"Say UNO when you have one card left.");
$("newRoundBtn").onclick=()=>startDemo(state.room);
