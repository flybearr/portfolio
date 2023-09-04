// const count  = (x)=>{
//     let sum=0;
//     for(let i=1 ; i<=x ; i++){
//         if(i<=2){
//             sum= sum + i;
//         }else if(i%2 !==0){
//             sum = sum +(-i)
//         }else if(i%2 === 0){
//             sum = sum +i
//         }
//     }
//     return sum;
// }


// console.log(count(6))




//亂數
function getRandomInt() {
	return Math.floor(Math.random() * 14)+1;
}



// function goRandom() {
// 	//取得該數字範圍的亂數
// 	R = getRandomInt()
    
//     while(!newarray.includes(R)){
//         newarray.push(R)
//     }

//     if(newarray.length!==14){
//         goRandom()
//     }

//     return newarray
//     }



//     console.log(goRandom());
//----------------------------







//亂數
function getRandomInt2() {
	return +(Math.random() * 10).toFixed(1);
}



let display = document.querySelector('#display');

//塞入的陣列 並輸出
let newarray = [];

//目前亂數是多少
let R = 0;
let output;


//取出抽獎箱的物品


const suprise = {'S':1,'A':1,'B':2,'C':3,'D':7}
const array = ['S','A','B','B','C','C','C','D','D','D','D','D','D','D']

const newdiv = document.createElement('p')
        const textNode = document.createTextNode(`抽獎箱剩下${array}`)
        newdiv.appendChild(textNode)

        display.appendChild(newdiv)



const shot = (x)=>{
    let a =  array.indexOf(x)
    array.splice(a,1)
    while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      const newdiv2 = document.createElement('p')
    const newtextNode = document.createTextNode(`抽獎箱剩下${array}`)
    newdiv2.appendChild(newtextNode)
    display.appendChild(newdiv2)
    return array
 }
    function goRandom2() {

       
        //取得該數字範圍的亂數
        R = getRandomInt2()
        let output;
            // S賞
            if(R >=0 && R<0.5 && Object.values(suprise)[0]){
                suprise.S = suprise.S -1
                shot('S')
                return   display.innerHTML+= '被抽出的是S'
            }else if(R >=0.5 && R<1 && Object.values(suprise)[1]){
                suprise.A = suprise.A -1
                shot('A')
                return   display.innerHTML+= '被抽出的是A'
                 output='A'
            } else if(R >=1&&R< 4 && Object.values(suprise)[2]){
                suprise.B = suprise.B -1
                shot('B')
                return   display.innerHTML+= '被抽出的是B'
                output='B'
            } else if(R >=4 && R<6 && Object.values(suprise)[3]){
                suprise.C = suprise.C -1
                shot('C')
                return   display.innerHTML+= '被抽出的是C'
            } else if(R >=6 && R<=10 && Object.values(suprise)[4]){
                suprise.D = suprise.D - 1
                shot('D')
                return   display.innerHTML+= '被抽出的是D'
                
            }else{
                goRandom2()
            }

           
        }



