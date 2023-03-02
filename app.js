const addnotes = document.querySelector(".add-notes");
const popupbox = document.querySelector(".popup-box");
const closebtn = document.querySelector("header i");
const addbtn = document.querySelector(".add-btn");
const titleTxt = document.querySelector("input");
const descr = document.querySelector("textarea")
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


addnotes.addEventListener("click", () => {
    popupbox.classList.add("show");
});
closebtn.addEventListener("click", () => {
    titleTxt.value = "";
    descr.value = "";
    popupbox.classList.remove("show");
});

function displ() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach(note => {
        let list = `<li class="note">
        <div class="details">
            <p style="word-wrap: break-word;">${note.title}</p>
            <span class="spans" style="word-wrap: break-word;">${note.descriptions}</span>
        </div>
        <div class="bottom">
            <span>${note.date}</span>
            <div class="changes">
                <i class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li><i class="uil uil-pen"></i>Edit</li>
                    <li><i class="uil uil-trash"></i>Remove</li>
                </ul>
            </div>
        </div>
    </li>`
        addnotes.insertAdjacentHTML("afterend", list);
    });
}


addbtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTxt.value,
        description = descr.value;
    if (noteTitle || description) {
        let dateObj = new Date(),
            month = dateObj.toLocaleString('default', { month: "long" }),
            day = dateObj.getDate(),
            year = dateObj.getFullYear();
        let details = {
            title: noteTitle, descriptions: description,
            date: `${month} ${day} ${year}`
        }
        notes.push(details);
        localStorage.setItem("notes", JSON.stringify(notes))
        closebtn.click();
        displ();
    }
})
displ(); 