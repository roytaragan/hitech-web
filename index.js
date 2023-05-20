const ENDPOINT_URL = 'https://eo5wh9exx1dmu02.m.pipedream.net/';
const CALLBACK_URL = 'https://eojvi7dkd5nj831.m.pipedream.net/';

const imageUrls = [];

async function submit() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.classList.add('disabled');
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const text = `seed=46
0:sks ${subject} hitting the drums in office, highly detailed face ,cinematic composition, beautiful lighting, sharp, details, hyper - detailed, hdr, 4 k, 8 k, bright light, pale sunrise, cinematic lighting, ultra realistic, highly detailed, depth of field, f/1.8, 85mm, medium shot, mid shot, ((bright soft diffused light)), volumetric fog, trending on instagram, trending on tumblr, HDR 4k, 8k [[Text, typography, watermark]]
100:sks ${subject} playing guitar in office, highly detailed face ,cinematic composition, beautiful lighting, sharp, details, hyper - detailed, hdr, 4 k, 8 k, bright light, pale sunrise, cinematic lighting, ultra realistic, highly detailed, depth of field, f/1.8, 85mm, medium shot, mid shot, ((bright soft diffused light)), volumetric fog, trending on instagram, trending on tumblr, HDR 4k, 8k [[Text, typography, watermark]]
200:sks ${subject} in a picture with a pregnant woman, in 21st century in 21st century,bright light, pale sunrise, cinematic lighting, ultra realistic,highly detailed, depth of field, f/1.8, 85mm, medium shot, mid shot, (professionally color graded), ((bright soft diffused light)), volumetric fog, trending on instagram, trending on tumblr, hdr 4k, 8k [[Text, typography, watermark]]
300:sks ${subject} in an family picture with 2 babies, stunning living room in 21st century in 21st century, bright light, pale sunrise, cinematic lighting, ultra realistic,, highly detailed, depth of field, f/1.8, 85mm, medium shot, mid shot, (professionally color graded), ((bright soft diffused light)), volumetric fog, trending on instagram, trending on tumblr, hdr 4k, 8k [[Text, typography, watermark]]
320:sks ${subject} in a family picture as an old man with his old wife his adult kids and 8 grandchildren , in 21st century in 21st century, bright light, pale sunrise, cinematic lighting, stunning living room, ultra realistic,,highly detailed, depth of field, f/1.8, 85mm, medium shot, mid shot, (professionally color graded), ((bright soft diffused light)), volumetric fog, trending on instagram, trending on tumblr, hdr 4k, 8k [[Text, typography, watermark]]`;
    let request = {
        tune: {
            name: subject, // man, woman or person
            title: email,
            branch: 'sd21',
            prompts_attributes: [{
                callback: `${CALLBACK_URL}?email=${email}`,
                text
            }],
            image_urls: imageUrls
        }
    }
    try { 
        const response = await fetch(ENDPOINT_URL, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(request)
        });
    } catch (e) {
        console.error('Failed to submit request. Error:', e);
    }
    
    submitBtn.style.display = 'none';
    document.getElementById('form').style.display = 'none';
    document.getElementById('thanks').style.display = 'flex';

}
function isValidEmail(email) {
    return RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/, "gi").test(email);
}
function updateSubmitState() {
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submitBtn');
    const instruction = document.getElementById('instruction');

    if (imageUrls.length < 4) {
        submitBtn.style.display = 'none';
        instruction.style.display = 'block';
    } else {
        submitBtn.style.display = 'block';
        submitBtn.classList.remove('disabled');

        if (isValidEmail(email)) {
            submitBtn.classList.remove('disabled');
            submitBtn.disabled = false;
            instruction.style.display = 'none';
        } else {
            instruction.textContent = 'Need an email address. We won\'t do anything bad with it!';
            instruction.style.display = 'block';
            submitBtn.classList.add('disabled');
            submitBtn.disabled = true;
        }
    }
}
function showUploadWidget() {
    cloudinary.openUploadWidget({
       cloudName: "dmsawzoc6",
       uploadPreset: "bwzsaydz",
       resourceType: 'image',
       language: "en",
       maxFiles: 40,
       maxFileSize: 4000000,
       sources: [
           "local"
       ],
       folder: 'user_images',
       //tags: [email],
       showAdvancedOptions: false,
       cropping: false,
       multiple: true,
       defaultSource: "local",
       text: {
        en: {
            menu: {
                files: ' '
            }
        }
       },
       styles: {
           palette: {
               window: "#ffffff",
               sourceBg: "#ecebea",
               windowBorder: "#aaaaaa",
               tabIcon: "#aaaaaa",
               inactiveTabIcon: "#aaaaaa",
               menuIcons: "#5fa0d5",
               link: "#5fa0d5",
               action: "#5fa0d5",
               inProgress: "#5fa0d5",
               complete: "#5fd5a4",
               error: "#d59e5f",
               textDark: "#000000",
               textLight: "#ffffff"
           },
           fonts: {
               default: null,
               "'Varela Round', sans-serif": {
                   url: "https://fonts.googleapis.com/css?family=Varela+Round",
                   active: true
               }
           }
       }
    }, (err, info) => {
            if (!err) {    
                console.log("Upload Widget event:", info);
                if (info.event === 'success') {
                    imageUrls.push(info.info.secure_url);
                }
                
                updateSubmitState();    
            }
            else {
                console.error("Upload Widget error:", err);
            }
    });
}
   
updateSubmitState();

document.getElementById('upload_widget').addEventListener('click', () => {
    showUploadWidget();
}, false);

document.getElementById('submitBtn').addEventListener('click', () => {
    submit();
}, false);

document.getElementById('email').addEventListener('input', () => {
    updateSubmitState();
});