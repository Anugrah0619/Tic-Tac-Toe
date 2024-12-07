let allBtn = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container-hide");
let msg = document.querySelector("#msg")


let turnO = true;                         //tracks O turns
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let input = 0;

resetbtn.addEventListener('click',()=>{                                    //resetbtn
    turnO = true;
    allBtn.forEach((indBtn) =>{         
        indBtn.disabled = false;                                           // enabling all btns
        indBtn.innerText = "";                                           // resetting all btns to empty
    })
    msgContainer.classList.add("msg-container-hide");                   // adding hidden div for hiding of prev winner
    input = 0;
})

allBtn.forEach((indBtn) =>{                                          //adding event listeners to each button of a click
    indBtn.addEventListener('click',() =>{
        console.log("Box was clicked.");
        indBtn.classList.remove("fontcolorX", "fontcolorO");           //after 1 itr, the font color remains same. Therefore removing
        if(turnO == true)
        {
            indBtn.innerText = "O";
            indBtn.classList.add("fontcolorO");
            turnO = false;
        }
        else
        {
            indBtn.innerText = "X";
            indBtn.classList.add("fontcolorX");
            turnO = true;
        }
        indBtn.disabled = true;                                             //disabling btn after its input as it can be changed by another click

        input +=1;
        checkCondition();
    })
})

const checkCondition = ()=>{                                               //checking for winner by checking all possible winning patterns
    for(let pattern of winPatterns)
    {
        let pos1val = allBtn[pattern[0]].innerText;
        let pos2val = allBtn[pattern[1]].innerText;
        let pos3val = allBtn[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != "")
        {
            if (pos1val === pos2val && pos2val === pos3val)
            {
                allBtn.forEach((indBtn)=>{                                  //disabling all btns as winner detected (btns can be individually disabled not as a collection)
                    indBtn.disabled = true;
                })
                showWinner(pos1val);
                return;
            }
        }  
    }
    if(input == 9)
    {
        drawCondition();
    }
};

const showWinner = (winner) =>{                                                // displays winner
    msg.innerText = `${winner} wins.`;
    msgContainer.classList.remove("msg-container-hide");                      // removing hidden div for display of winner
    return;
};

const drawCondition = () =>{
    msg.innerText = "It's a Draw.";
    msgContainer.classList.remove("msg-container-hide");
}

