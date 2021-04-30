index = {
    set: {
        shortcutCategories: function(categories) {
            let ulCategories = Id('ulCategories');
            ulCategories.innerHTML = '';
            
            categories.forEach(category => {
                let categoryHeader = index.create.categoryHeader(category);
                ulCategories.appendChild(categoryHeader);
                ulCategories.appendChild(index.create.shortcutsList(category.shortcuts));
            })

            
        },
        programList: function(programs) {
            let programList = Id('ulPrograms');

            programs.forEach(program => {
                let programLi = index.create.programListItem(program);

                programList.appendChild(programLi);
            });
        }
    },
    create: {
        shortcutsList: function(shortcuts) {
            let ulShortcuts = document.createElement('ul');
            ulShortcuts.classList.add('ulShortcuts')
            
            shortcuts.forEach(shortcut => {
                let li = document.createElement('li');
                li.innerHTML = `
                    <span>${shortcut.name}</span>
                    <div class="divShortcutButtons">

                    </div>
                    `;
                
                let shortcutButtons = li.querySelector('.divShortcutButtons')
                let buttons = shortcut.buttons.split(", ");
                buttons.forEach(button => {
                    let buttonDiv = document.createElement('div');
                    buttonDiv.classList.add('divButton');
                    buttonDiv.innerHTML = `<p>${button}</p>`

                    shortcutButtons.appendChild(buttonDiv);

                    let plusSign = document.createElement('span');
                    plusSign.classList.add('plusSign');
                    plusSign.innerHTML = "+";
                    shortcutButtons.appendChild(plusSign);
                });

                shortcutButtons.removeChild(shortcutButtons.lastChild);

                ulShortcuts.appendChild(li);
            });

            return ulShortcuts;
        },
        categoryHeader: function(category) {
            let categoryHeader = document.createElement('div');
            categoryHeader.classList.add('divCategoryHeader');
            categoryHeader.innerHTML = `
                <h2>${category.category}</h2>
                <input type="text" style="display:none;">
            `;

            categoryHeader.ondblclick = index.events.editCategoryName;

            categoryHeader.querySelector('input').onblur = categoryHeader.querySelector('input').onchange = index.events.saveCategoryName;
            categoryHeader.querySelector('input').onkeyup = function(evt) {
                if (evt.keyCode === 13) {
                    index.events.saveCategoryName(evt);
                }
            }

            return categoryHeader;
        },
        programListItem: function(program) {
            let programLi = document.createElement('li');
            programLi.innerHTML = `
                <p>${program.program}</p>
                <input type="text" style="display:none;">
            `;

            programLi.params = program;
            programLi.onclick = function(evt) {
                index.set.shortcutCategories(this.params.categories);
            };

            programLi.ondblclick = index.events.editProgramName;

            programLi.querySelector('input').onblur = programLi.querySelector('input').onchange = index.events.saveProgramName;
            programLi.querySelector('input').onkeyup = function(evt) {
                if (evt.keyCode === 13) {
                    index.events.saveProgramName(evt);
                }
            }

            return programLi
        }
    },
    data: {
        programs: [
            {
                "program": "Visual Studio Code",
                "categories": [
                    {
                        "category": "Basic Editing",
                        "shortcuts": [
                            {"name": "Cut line", "buttons": "CTRL, X"},
                            {"name": "Move line", "buttons": "ALT, ARROW"},
                            {"name": "Indent/outdent line", "buttons": "CTRL, ] / ["},
                            {"name": "Collapse all", "buttons": "CTRL, K, 0"}
                        ]
                    }, {
                        "category": "Search and Replace",
                        "shortcuts": [
                            {"name": "Find", "buttons": "CTRL, F"},
                            {"name": "Replace", "buttons": "SHIFT, H"}
                        ]
                    }
                ]
            }, {
                "program": "Visual Studio Code 2",
                "categories": [
                    {
                        "category": "Basic Editing",
                        "shortcuts": [
                            {"name": "Open terminal", "buttons": "CTRL, SHIFT, `"},
                            {"name": "Collapse all", "buttons": "SHIFT, C"}
                        ]
                    }
                ]
            },
        ],
        games: [
            {
                "program": "Red alert 2",
                "categories": [
                    {
                        "category": "Basic editing",
                        "shortcuts": [
                            {"name": "Open terminal", "buttons": "CTRL, SHIFT, `"},
                            {"name": "Collapse all", "buttons": "SHIFT, C"}
                        ]
                    },                     {
                        "category": "Basic editing",
                        "shortcuts": [
                            {"name": "Open terminal", "buttons": "CTRL, SHIFT, `"},
                            {"name": "Collapse all", "buttons": "SHIFT, C"}
                        ]
                    }
                ]
            }, {
                "program": "Visual Studio Code",
                "categories": [
                    {
                        "category": "Basic editing",
                        "shortcuts": [
                            {"name": "Open terminal", "buttons": "CTRL, SHIFT, `"},
                            {"name": "Collapse all", "buttons": "SHIFT, C"}
                        ]
                    }
                ]
            },
        ],
    },
    events: {
        editProgramName: function(evt) {
            let inputBox = this.querySelector('input');
            let programName = this.querySelector('p');

            inputBox.style.display = "block";
            programName.style.display = "none";

            let programNameText = this.querySelector('p').innerHTML;
            inputBox.value = programNameText;
            inputBox.focus();
        },
        saveProgramName: function(evt) {
            let inputBox = this;
            let programName = inputBox.parentElement.querySelector('p');

            programName.innerHTML = inputBox.value;

            inputBox.style.display = "none";
            programName.style.display = "block";
        },
        editCategoryName: function(evt) {
            let inputBox = this.querySelector('input');
            let programName = this.querySelector('h2');

            inputBox.style.display = "block";
            programName.style.display = "none";

            let programNameText = this.querySelector('h2').innerHTML;
            inputBox.value = programNameText;
            inputBox.focus();
        },
        saveCategoryName: function(evt) {
            let inputBox = this;
            let programName = inputBox.parentElement.querySelector('h2');

            programName.innerHTML = inputBox.value;

            inputBox.style.display = "none";
            programName.style.display = "block";
        },
        addNewProgram: function(evt) {
            let addButton = this;
            let newProgramObj = {
                program: "New program",
                categories: [
                    {
                        category: "New category",
                        shortcuts: []
                    }
                ]
            }

            let newProgramLi = index.create.programListItem(newProgramObj);
            Id('ulPrograms').appendChild(newProgramLi);

            newProgramLi.click();
        },
        addNewGame: function(evt) {
            let addButton = this;
            let newGameObj = {
                program: "New game",
                categories: [
                    {
                        category: "New category",
                        shortcuts: []
                    }
                ]
            }

            let newGameLi = index.create.programListItem(newGameObj);
            Id('ulGames').appendChild(newGameLi);

            newGameLi.click();
        }
    },
    format: {
        html: function(htlmString) {

        }
    }, 
    procedure: function(url) {
        fetch(url)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    },
    init: function() {
        index.set.shortcutCategories(index.data.programs[0].categories);
        index.set.programList(index.data.programs);

        Id('btnAddProgram').onclick = index.events.addNewProgram;
        Id('btnAddGame').onclick = index.events.addNewGame;
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    index.init();
});

function Id(id) {
    return document.getElementById(id);
}