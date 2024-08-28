function color(){
    document.getElementById("select-color").innerHTML=` <label class="chooseColor">Choose Colour</label> <input id="colorValue" class="colorValue" value='#fefefe' type="color" >`;

    let colorValue=document.getElementById("colorValue");
    colorValue.addEventListener("input",(a)=>{

        document.getElementById("note-input").style.backgroundColor=colorValue.value;
    })

}


function searchText() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let content = document.getElementById('note-input');
    let text = content.value.toLowerCase();

    content.selectionStart = 0;
    content.selectionEnd = 0;
    

    if (input && text.includes(input)) {
 
        let startIndex = text.indexOf(input);
       
        content.focus();
        content.setSelectionRange(startIndex, startIndex + input.length);
    } else {
        alert("No matches found.");
    }
}
