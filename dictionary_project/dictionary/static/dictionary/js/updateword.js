
var updateBtns = document.getElementsByClassName('update-row');

// hide / show different buttons while editing
for(var i=0; i<updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function(){
        var wordId = this.dataset.word;
        var action = this.dataset.action;
        // select row with self.id , hide data and show edit field 
        // original world
        let origInput = document.getElementsByClassName('tbl-input ' + wordId + ' original')[0]
        // translated world
        let transInput = document.getElementsByClassName('tbl-input ' + wordId + ' translated')[0]
        // definition
        let definInput = document.getElementsByClassName('tbl-input ' + wordId + ' definition')[0]
        // buttons
        var delBtn = document.getElementById('delBtn' + wordId)
        var doneBtn = document.getElementById('doneBtn' + wordId)
        var cancelBtn = document.getElementById('cancelBtn' + wordId)
        var editBtn = document.getElementById('editBtn' + wordId)

        // check if action is cancle or edit
        if (action == "edit") {  
            // change row element display styles  
            // for origianl world
            origInput.readOnly = false;
            origInput.classList.add('active-input')
            // for origianl world
            transInput.readOnly = false;
            transInput.classList.add('active-input')
            // for definition
            definInput.readOnly = false;
            definInput.classList.add('active-input')
            // for buttons
            delBtn.style.display = "none";
            doneBtn.style.display = "block";
            cancelBtn.style.display = "block";
            this.style.display = "none";

        } else if (action == "cancle") {
            // change row element display styles  
            // for origianl world
            origInput.readOnly = true;
            origInput.classList.remove('active-input')
            // for origianl world
            transInput.readOnly = true;
            transInput.classList.remove('active-input')
            // for definition
            definInput.readOnly = true;
            definInput.classList.remove('active-input')
            // for buttons
            editBtn.style.display = "block";
            delBtn.style.display = "block"
            doneBtn.style.display = "none";
            this.style.display = "none";

        } else if (action == "save") {
            // get edited data from forms
            var originalWord = origInput.value;
            var translatedWord =  transInput.value;
            var definition = definInput.value;
            // send data to function
            updateWord(originalWord, translatedWord, definition, wordId, action)
        } else if (action == "delete") {
            var originalWord = '';
            var translatedWord = '';
            var definition = '';
            updateWord(originalWord, translatedWord, definition, wordId, action)
        }
    });
}

// get csrf token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


// sends data to server 
function updateWord(original, translated, definition, id, action){
    console.log('params passed to function')

    var url = '/dictionary/update/'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'appliaction/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'original': original, 'translated': translated, 'definition': definition, 'wordId': id, 'action': action})
    })

    .then((response) =>{
        return response.json()
    })

    .then((data) =>{
        action = data['action']
        translatedWord = data['translatedWord']
        originalWord = data['originalWord']
        definition = data['definition']
        wordId = data['wordId']

        let origInput = document.getElementsByClassName('tbl-input ' + wordId + ' original')[0]
        // translated world
        let transInput = document.getElementsByClassName('tbl-input ' + wordId + ' translated')[0]
        // definition
        let definInput = document.getElementsByClassName('tbl-input ' + wordId + ' definition')[0]
        // buttons
        var delBtn = document.getElementById('delBtn' + wordId)
        var doneBtn = document.getElementById('doneBtn' + wordId)
        var cancelBtn = document.getElementById('cancelBtn' + wordId)
        var editBtn = document.getElementById('editBtn' + wordId)

        if (action == 'save') {
            document.getElementsByClassName('tbl-input ' + wordId + ' original')[0].value = originalWord;
            document.getElementsByClassName('tbl-input ' + wordId + ' translated')[0].value = translatedWord;
            document.getElementsByClassName('tbl-input ' + wordId + ' definition')[0].value = definition;

            origInput.readOnly = true;
            origInput.classList.remove('active-input')
            // for origianl world
            transInput.readOnly = true;
            transInput.classList.remove('active-input')
            // for definition
            definInput.readOnly = true;
            definInput.classList.remove('active-input')
            // for buttons
            editBtn.style.display = "block";
            delBtn.style.display = "block"
            doneBtn.style.display = "none";
            cancelBtn.style.display = "none";

        }
        if (action == 'delete') {
            document.getElementsByClassName('tableRow ' + wordId)[0].remove()
        }
        
    })

}

