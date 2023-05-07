function showUploadWidget() {
    cloudinary.openUploadWidget({
       cloudName: "<cloud name>",
       uploadPreset: "<upload preset>",
       sources: [
           "local"
       ],
       googleApiKey: "<image_search_google_api_key>",
       showAdvancedOptions: false,
       cropping: false,
       multiple: true,
       defaultSource: "local",
       styles: {
           palette: {
               window: "#000000",
               sourceBg: "#000000",
               windowBorder: "#8E9FBF",
               tabIcon: "#FFFFFF",
               inactiveTabIcon: "#8E9FBF",
               menuIcons: "#2AD9FF",
               link: "#08C0FF",
               action: "#336BFF",
               inProgress: "#00BFFF",
               complete: "#33ff00",
               error: "#EA2727",
               textDark: "#000000",
               textLight: "#FFFFFF"
           },
           fonts: {
               default: null,
               "'Space Mono', monospace": {
                   url: "https://fonts.googleapis.com/css?family=Space+Mono",
                   active: true
               }
           }
       }
    }, (err, info) => {
            if (!err) {    
                console.log("Upload Widget event:", info);
            }
            else {
                console.error("Upload Widget error:", err);
            }
    });
}
   

document.getElementById("upload_widget").addEventListener("click", () => {
    showUploadWidget();
}, false);