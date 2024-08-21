
function searchText() {
    // Get the search input and content container
    let input = document.getElementById('searchInput').value.toLowerCase();
    let content = document.getElementById('content');
    let paragraphs = content.getElementsByClassName('notes-show');
    
    // Clear previous highlights and hide all paragraphs
    for (let paragraph of paragraphs) {
        paragraph.innerHTML = paragraph.innerHTML.replace(/<span class="highlight">|<\/span>/g, '');
        paragraph.style.display = 'none';
    }

    // Array to hold paragraphs that contain the search term
    let matchedParagraphs = [];

    // Search for the term in each paragraph
    for (let paragraph of paragraphs) {
        let paragraphText = paragraph.textContent.toLowerCase();
        if (input && paragraphText.includes(input)) {
            // Highlight matched text
            let regex = new RegExp(`(${input})`, 'gi');
            paragraph.innerHTML = paragraph.innerHTML.replace(regex, '<span class="highlight">$1</span>');
            matchedParagraphs.push(paragraph);
        }
    }

    // If there are matches, display them at the top
    if (matchedParagraphs.length > 0) {
        content.innerHTML = '';  
        for (let paragraph of matchedParagraphs) {
            content.appendChild(paragraph);  
            paragraph.style.display = 'block';  
        }
    } else {
        content.innerHTML = '<p>No matches found.</p>';
    }
}
