document.addEventListener('DOMContentLoaded', function() {
    // PDF Merger functionality
    const pdfUpload = document.getElementById('pdf-upload');
    const pdfUploadArea = document.getElementById('pdf-upload-area');
    const selectedFilesContainer = document.getElementById('selected-files');
    const mergeBtn = document.getElementById('merge-btn');
    
    let pdfFiles = [];
    
    // Handle file selection
    pdfUpload.addEventListener('change', function(e) {
        pdfFiles = Array.from(e.target.files);
        updateFileList();
    });
    
    // Handle drag and drop
    pdfUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        pdfUploadArea.classList.add('dragover');
    });
    
    pdfUploadArea.addEventListener('dragleave', () => {
        pdfUploadArea.classList.remove('dragover');
    });
    
    pdfUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        pdfUploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if(files.length > 0) {
            pdfFiles = Array.from(files).filter(f => f.type === 'application/pdf');
            pdfUpload.files = files;
            updateFileList();
        }
    });
    
    // Update the displayed file list
    function updateFileList() {
        selectedFilesContainer.innerHTML = '';
        
        if(pdfFiles.length === 0) {
            return;
        }
        
        const fileList = document.createElement('div');
        fileList.className = 'file-list';
        
        const heading = document.createElement('h3');
        heading.textContent = 'Selected Files:';
        fileList.appendChild(heading);
        
        const list = document.createElement('ul');
        
        pdfFiles.forEach((file, index) => {
            const item = document.createElement('li');
            
            const fileName = document.createElement('span');
            fileName.textContent = file.name;
            
            const fileSize = document.createElement('span');
            fileSize.textContent = formatFileSize(file.size);
            
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            removeBtn.addEventListener('click', () => removeFile(index));
            
            item.appendChild(fileName);
            item.appendChild(fileSize);
            item.appendChild(removeBtn);
            
            list.appendChild(item);
        });
        
        fileList.appendChild(list);
        selectedFilesContainer.appendChild(fileList);
    }
    
    // Helper function to format file size
    function formatFileSize(bytes) {
        if(bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
    }
    
    // Remove file from list
    function removeFile(index) {
        pdfFiles.splice(index, 1);
        
        // Update the file input
        const dataTransfer = new DataTransfer();
        pdfFiles.forEach(file => dataTransfer.items.add(file));
        pdfUpload.files = dataTransfer.files;
        
        updateFileList();
    }
    
    // Merge button click handler
    mergeBtn.addEventListener('click', function() {
        if(pdfFiles.length < 2) {
            alert('Please select at least 2 PDF files to merge');
            return;
        }
        
        mergeBtn.disabled = true;
        mergeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // In a real implementation, this would use a PDF library like pdf-lib
        // For demo purposes, we'll simulate processing
        setTimeout(() => {
            alert('PDFs merged successfully! (Demo)');
            mergeBtn.disabled = false;
            mergeBtn.innerHTML = '<i class="fas fa-object-group"></i> Merge PDFs';
        }, 1500);
    });
    
    // PDF Splitter functionality would go here
});
