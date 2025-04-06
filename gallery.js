// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Remove loader once page is fully loaded
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Album data structure
    const albums = {
        beach: {
            title: 'Beach Memories',
            description: 'Sitting there, watching the sunset.',
            longDescription: '📍Beach Diary｜Sunset skies, flowing dresses, and unspoken feelings\n\n"I always thought the ocean was the most vast thing in the world—until I met you. That\'s when I learned how quietly love can rise, like waves lapping at the shore, slowly drowning me in warmth."\n\nThe sea breeze was impossibly gentle at dusk. My dress fluttered lightly in the wind. You caught the moment as I turned around—sunlight tangled in my hair like the tenderness you never say out loud.\n\nWe didn\'t do anything special. Just walked along the beach, talked about little things, laughed at silly stories. But I remember the way you said, "The sunset is really beautiful today."\nSomehow, I knew you weren\'t just talking about the sky.\n\n🦋The waves kept coming to our feet, over and over again, as if to remind me: Don\'t forget today. Don\'t forget this version of us.\nAnd I know, when I look back on this summer—this is the moment I\'ll remember: sitting next to you, quietly watching the light fade into the sea.',
            longDescriptionCN: '📍海边日记｜落日、裙摆，还有关于你的小心思\n\n「我总以为海是辽阔的，直到遇见你，才知道原来心动也可以像潮水一样，一点点淹没自己。」\n\n傍晚的海风温柔得不像话，裙摆轻轻扬起，我在落日余晖里回头，你恰好按下快门。光影藏在发梢，像你没说出口的温柔。\n\n我们什么都没做，只是在沙滩上随便走走，说说最近的烦恼，笑着互相打趣。可我却偷偷记下了你说"这片晚霞真美"的语气。\n\n🦋脚边的浪一遍遍拍打上来，像是在提醒我，把今天也好好收藏起来。你不说我也知道，以后再回忆起这个夏天，一定是和你并排坐在沙滩上的这一刻。',
            hasTranslation: true,
            photos: Array.from({length: 23}, (_, i) => ({
                src: `gallery/beach/${i + 1}.png`,
                caption: 'Beach Memory'
            })).concat([
                { src: 'gallery/beach/24.jpeg', caption: 'Beach Memory' }
            ])
        },
        city: {
            title: 'City Girl',
            description: 'Urban landscapes and cityscapes',
            longDescription: '"The city is so big. But I\'m in no rush—I walk through it slowly, alone."\n\nAt dusk, I sit on the rooftop. The wind messes up my hair and takes today\'s worries with it. Down below, people are rushing home from work. But I just want to pause for a moment—to see if the sky has painted the sunset in my favorite shade tonight.\n\n🌃 Sometimes, I feel like a tiny city light—always glowing, but never noticed.\nSo I put on my headphones, turn the volume low, and listen to the sound of my own heartbeat.\nStep by step, I walk or run, not to chase something, but maybe just to stay ahead of the loneliness.\n\n🐈 Sometimes, I hold the neighborhood cat gently in my arms—as if we both needed to feel wanted by something soft.\nThis city never waits for anyone. But the sunset does.\nIt shows up every day, just waiting for someone to look up.',
            longDescriptionCN: '城市那么大，我一个人也能走得很慢。」\n\n日暮时分我坐在天台，风吹乱头发，也吹散了今天的心事。有人在楼下奔忙，有人刚下班回家，而我只是想静静地待一会儿，看看天空有没有把晚霞调成我喜欢的颜色。\n\n🌃 有时候觉得自己就像城市的一颗小灯泡，亮着，但不会被注意。\n所以我把耳机戴好，把音量调低一点，听自己心跳的声音。\n一边跑步，一边数着脚步声，仿佛这样，就不会被孤独追上。\n\n🐈 偶尔抱抱楼下的猫，像是在安慰自己也在被温柔需要着。\n这个城市不会停下来等你，但落日会，它每天都等你抬头看一眼。',
            hasTranslation: true,
            photos: Array.from({length: 8}, (_, i) => ({
                src: `gallery/city/${i + 1}.png`,
                caption: 'City Scene'
            }))
        },
        evening: {
            title: 'Evening Scenes',
            description: 'The evening breeze is gentle',
            longDescription: '"Some things don\'t need to be said out loud. The stars will listen for you."\n\nEvening always arrives just on time.\nNot too early, not too late—like it somehow knows you\'re a little tired today, but not quite ready to sleep.\nSo it sprinkles stars across the sky and sets the wind to your favorite kind of softness.\n\n🌠 I rest my chin in my hands and gaze out the window, watching the night stretch endlessly beyond the buildings.\nI\'m not thinking about anyone in particular. I don\'t have anything I need to say.\nJust sitting here in silence with the stars feels romantic enough.\n\n🌌 The older I get, the more I fall in love with the night.\nIt doesn\'t demand attention. It doesn\'t push or pull.\nIt\'s like an old friend who knows when to be quiet,\ngently holding space for the slow, thoughtful version of me.\n\n📝 Nothing big happened today.\nBut after dark, I found myself falling in love with the world just a little bit more.',
            longDescriptionCN: '📍Evening Note｜夜晚的风是温柔的，它不会问你白天过得怎样\n\n「有些话不需要说出口，星星会替你听。」\n\n夜晚降临得总是刚刚好，不早不晚，像是知道你今天有一点累、又不想太早睡。于是它把星星点在天上，把风调成你喜欢的温度。\n\n🌠 我坐在窗边，双手托着下巴，看着远方没有尽头的夜。\n没有特别想谁，也没有特别想说的话，只是觉得这样静静地陪着星空发呆，好像也挺浪漫的。\n\n🌌 越长大越喜欢夜晚。它不吵不闹，不热情也不冷淡。\n就像一位懂分寸的老朋友，陪你躲进自己的小小宇宙，让你安心做个慢吞吞的自己。\n\n📝 今天也没什么大事发生。\n只是在天黑之后，偷偷又喜欢上这个世界一点点。',
            hasTranslation: true,
            photos: Array.from({length: 14}, (_, i) => ({
                src: `gallery/evening/${i + 1}.png`,
                caption: 'Evening Scene'
            }))
        },
        hello: {
            title: 'Hello Moments',
            description: 'The first word of the day, soft and simple',
            longDescription: '"Hi there—\nYou\'ve been doing your best today, haven\'t you?"\n\nWhen the camera moves in close, it feels like you\'re right across from me.\nNot on a stage, not in someone\'s stories—just here, in this tiny moment of real life.\nTucking in a ribbon, waving a hand, cheeks gently flushed… all of it quietly says, "I hope you see me."\n\n👒I love greetings like this. No need for long explanations.\nJust a glance, a little "hello"—and suddenly, the day feels warmer.\n\n📖 Someone once said that how you start a conversation can shape your entire day.\nSo let this smile be your bookmark for a good mood.\n\n🫧 Maybe we don\'t know each other yet. Maybe we\'ll just pass by.\nBut if I ever get the chance to say the first word, I\'ll say—\n"Hi. You look lovely today."',
            longDescriptionCN: '"你好呀，今天也很努力吧？"\n\n镜头靠近的时候，好像你就在我对面。不是在舞台上，也不是在朋友圈，是生活里最普通的时刻——系好领结、轻轻挥手、偷偷红了脸。\n\n👒我喜欢这样的打招呼方式，不用说太多，也不用解释太久。一个眼神、一句"hi"，就像是告诉你："我有在等你注意我。"\n\n📖有人说，温柔的开场白，决定了一天的情绪。那我就用一张笑脸，替你存下今天的好心情吧。\n\n🫧也许我们还不熟，也许只是擦肩而过，但我想，如果有机会说第一句话，那我会说："你好，今天的你真好看。"',
            hasTranslation: true,
            photos: Array.from({length: 10}, (_, i) => ({
                src: `gallery/hello/${i + 1}.png`,
                caption: 'Hello Moment'
            }))
        },
        music: {
            title: 'Music',
            description: 'When words fall short, music starts to speak',
            longDescription: '"When words fall short, music starts to speak."\n\nI\'ve always felt that music isn\'t just for performing—it\'s for keeping you company.\n\n🎻 When I play the violin by the sea, the wind joins in as my duet partner.\n❄️ When I play the flute on a snowy night, even the snowflakes fall more gently, as if they\'re listening.\n🖤 And when I sit in front of the piano, time slows down—until it\'s just me, and the melody.\n\nMusic is the quiet space between all the noise.\nIt doesn\'t ask for attention. It doesn\'t try to impress.\nBut when life gets too heavy, it quietly offers an escape.\n\n🎵 You don\'t have to know music theory. You don\'t have to be great.\nAs long as you\'re playing, life won\'t feel so silent.',
            longDescriptionCN: '「当语言失效的时候，音符就开始说话了。」\n\n我一直觉得，音乐不是拿来表演的，而是拿来陪伴的。\n\n🎻 在海边拉琴的时候，风会来和我合奏；\n❄️ 在雪夜吹笛的时候，连雪花都轻轻落下，像是在听我诉说。\n🖤 坐在钢琴前的时光，总是最安静的片刻，好像一切都慢下来，只剩下自己和旋律。\n\n音乐是生活的缝隙，它不惊艳，不张扬，但在你想逃离现实的瞬间，会悄悄为你留一个出口。\n\n🎵 不需要懂乐理，也不需要弹得多好，只要你在弹奏，生活就不会太沉默。',
            hasTranslation: true,
            photos: Array.from({length: 4}, (_, i) => ({
                src: `gallery/music/${i + 1}.png`,
                caption: 'Music Moment'
            }))
        },
        nature: {
            title: 'Nature',
            description: 'Maybe what we call nature… is just a softer version of ourselves',
            longDescription: '"Maybe what we call nature… is just a softer version of ourselves."\n\n🐶 Running through flower fields with my dog, sunlight in my eyes—I laughed like a child, without even thinking.\n🌿 Sitting quietly with the plants, breathing with the fruit trees, I realized life doesn\'t have to be complicated.\nNature already knows all the answers—we just have to listen.\n\n🧚‍♀️ Sometimes I wish I could become a forest fairy,\nbarefoot by the water, holding a tiny light in my hands,\nsaying nothing, thinking nothing, just… being.\n\n🌸 Spring is on its way.\nI made a wish on a cherry blossom—\nthat every "today" in the future could be gently loved,\njust as it is.\n\nNature doesn\'t ask questions.\nIt doesn\'t demand anything.\nIt simply stays—with quiet strength,\nhelping you bloom again, slowly.',
            longDescriptionCN: '「想靠近自然，其实就是想靠近一个更温柔的自己。」\n\n🐶 和狗狗在花田里奔跑时，阳光洒在眼睛上，我也突然笑得像小孩。\n🌿 和植物一起发呆、和果实一起呼吸，才发现生活并不复杂，大自然早就替我们写好了答案。\n\n🧚‍♀️ 有时候我也想变成一只森林精灵，坐在水边捧着小小的光，什么也不想，什么也不说。\n\n🌸 春天在靠近，我用一朵樱花许了个愿，希望未来的每一个"今天"，都能被轻轻喜欢着。\n\n自然很安静，但也很有力量。它不问你要什么，只会慢慢陪着你一点点好起来。',
            hasTranslation: true,
            photos: Array.from({length: 11}, (_, i) => ({
                src: `gallery/nature/${i + 1}.png`,
                caption: 'Nature Scene'
            }))
        },
        room: {
            title: 'Home',
            description: 'Life doesn\'t have to be full',
            longDescription: '"Some days don\'t need noise or speed.\nA quiet morning, a warm corner, and a cup of sunlight—\nthat\'s happiness, just right."\n\n☕️ The morning light slips through the curtains.\nI hold my cat in silence.\nIt doesn\'t ask what I\'m planning for the day.\nIt simply stays.\n\n📖 In the afternoon, I picked up an old novel from the bookshelf.\nThree pages in, I got distracted by how golden the light was.\nFor a moment, I felt like I\'d wandered into the pages of a storybook.\n\n🌊 A soft breeze lifts the curtains.\nI lean against the balcony, music in my ears,\nand though the world is quiet,\nmy heart feels full.\n\n🎇 Evenings are for small hopes—\na book half-read,\nfireworks outside the window,\nor maybe just a quiet "see you next time."',
            longDescriptionCN: '「日子不喧哗，也不慌张，在窗边晒着太阳，就是一种刚刚好的幸福。」\n\n☕️ 清晨的阳光透过窗帘，我抱着猫咪发了会儿呆。它没有问我今天要做什么，只是默默地陪着。\n\n📖 下午在书堆里找了一本旧小说，读了三页，就被暖黄的光晕困住了。偶尔一抬头，觉得自己住进了绘本里。\n\n🌊 风吹起窗帘，我靠在阳台边发呆，脑海里放着最喜欢的音乐，世界很静，心里却满得刚刚好。\n\n🎇 夜晚最适合小小期待。也许是一本读到一半的书，也许是窗外的烟花，也许是一个再普通不过的"下次见"。',
            hasTranslation: true,
            photos: Array.from({length: 10}, (_, i) => ({
                src: `gallery/room/${i + 1}.png`,
                caption: 'Room Scene'
            }))
        },
        travel: {
            title: 'Travel',
            description: 'Adventures around the world',
            longDescription: '📍The destination doesn\'t matter—traveling with you is what makes it meaningful.\n\n"You said the sea breeze would blow our worries away, so I followed you to chase the wind."\n\nWhen the wind lifted the hem of my skirt, I felt like a heroine in a youth novel. The sunlight was gentle, the air was sweet—just like the beginning of a love story.\n\nYou turned back to look at me, smiling softly. And in that moment, my heart skipped a beat. I thought, maybe this trip should be called "a journey to you."\n\n🌾In that golden field, we lay side by side, talking about the past and the future. You said you remembered the first time we met—I wore a white blouse and a dark skirt too. The wind whispered like a vow, everything felt just right, like a scene written by fate.\n\n🪷At dusk, I changed into a yukata. We made wishes at a shrine. You asked me what I wished for. I smiled, "If I say it, it won\'t come true."\nBut secretly, I wished—"Let this journey go on forever. Even if the places change, may it always be you beside me."',
            longDescriptionCN: '📍目的地不重要，和你一起才是旅行的意义\n\n「你说海边的风会把烦恼吹走，那我就陪你一起追风。」\n\n裙摆被风吹起的那一刻，我以为自己成了小说里的女主角，阳光温柔，空气甜得像是恋爱的前奏。\n\n你在前面回头看我，嘴角带着笑，我忽然有点不争气地心动了。那一刻我想，这趟旅行，不如叫"奔赴你"更合适一点。\n\n🌾那片金黄的麦田，我们躺着聊从前，聊以后。你说你记得第一次遇见我时，我穿的也是白色上衣和黑裙子。风吹过的声音像是在起誓，一切都刚刚好，像是命运安排的浪漫剧本。\n\n🪷傍晚换上浴衣，我们在神社门口投了硬币许愿。你问我许了什么，我笑着说："说出来就不灵了。"其实我偷偷许的是——"希望这段旅程一直延续，哪怕换了地点，也别换了你。"',
            hasTranslation: true,
            photos: Array.from({length: 15}, (_, i) => ({
                src: `gallery/travel/${i + 1}.png`,
                caption: 'Travel Memory'
            }))
        },
        winter: {
            title: 'Winter',
            description: 'The wind turns cold, but the heart slowly begins to warm',
            longDescription: '"The wind turns cold,\nbut the heart slowly begins to warm."\n\n🚉 The train station feels especially quiet in winter.\nI wrap my scarf a little tighter, hands tucked in my coat pockets,\nwaiting for a train going somewhere unknown—\nas if I\'m waiting for someone who hasn\'t arrived yet.\n\n☃️ I made a tiny snowman in the woods with a friend.\nIt didn\'t say anything, but it kept smiling.\nMaybe that\'s what gentle company really is—\nnot asking, not talking, just quietly being there.\n\n🌨️ Winter is a season made for missing people.\nThe wind stirs old memories.\nSnow falls into quiet corners of the heart.\nEven if you don\'t come, it\'s okay—\nI\'ll watch the snow, count the stars, and keep walking.',
            longDescriptionCN: '「风在变冷，心却慢慢热起来。」\n\n🚉 火车站的风格外安静，我裹紧围巾，把手藏进大衣口袋里，等一辆不知道驶向哪里的列车，像在等一个还没来的人。\n\n☃️ 雪地里和朋友做了一个小雪人，它什么也不会说，但总是笑着。\n我想，也许温柔的陪伴，就该是这样——不问、不说，只在身边。\n\n🌨️ 冬天其实是很适合想念的季节。风吹进回忆，雪落进心事。\n你不出现也没关系，我会替你好好看着雪、数着星星，继续往前走。',
            hasTranslation: true,
            photos: Array.from({length: 10}, (_, i) => ({
                src: `gallery/winter/${i + 1}.png`,
                caption: 'Winter Scene'
            }))
        }
    };

    // Get modal elements
    const modal = document.getElementById('albumModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPhotos = document.getElementById('modalPhotos');
    const closeModal = document.querySelector('.close-modal');

    // Pagination variables
    const photosPerPage = 4;
    let currentPage = 1;
    let currentAlbum = null;
    let currentLanguage = 'en'; // Default language is English

    // Add click event listeners to album covers
    document.querySelectorAll('.album-item').forEach(albumItem => {
        albumItem.addEventListener('click', function() {
            const albumKey = this.getAttribute('data-album');
            openAlbum(albumKey);
        });
    });

    // Function to open album
    function openAlbum(albumKey) {
        const album = albums[albumKey];
        if (!album) return;

        currentAlbum = albumKey;
        currentPage = 1;
        currentLanguage = 'en'; // Reset language to English when opening a new album

        // Set modal title
        modalTitle.textContent = album.title;

        // Clear previous photos
        modalPhotos.innerHTML = '';

        // Add photos to modal with pagination
        displayPhotos(album.photos, currentPage);

        // Add album description
        addAlbumDescription(album);

        // Add pagination controls if needed
        addPaginationControls(album.photos.length);

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Function to handle pagination
    function handlePagination(photos, currentPage, photosPerPage) {
        const startIndex = (currentPage - 1) * photosPerPage;
        const endIndex = startIndex + photosPerPage;
        return photos.slice(startIndex, endIndex);
    }

    // Function to display photos in the modal
    function displayPhotos(photos, currentPage, photosPerPage = 4) {
        const modalPhotos = document.getElementById('modalPhotos');
        modalPhotos.innerHTML = '';
        
        const paginatedPhotos = handlePagination(photos, currentPage, photosPerPage);
        
        paginatedPhotos.forEach(photo => {
            const photoContainer = document.createElement('div');
            photoContainer.className = 'photo-container';
            
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption || 'Gallery photo';
            
            if (photo.caption) {
                const caption = document.createElement('div');
                caption.className = 'photo-caption';
                caption.textContent = photo.caption;
                photoContainer.appendChild(img);
                photoContainer.appendChild(caption);
            } else {
                photoContainer.appendChild(img);
            }
            
            modalPhotos.appendChild(photoContainer);
        });
    }

    // Function to add album description
    function addAlbumDescription(album) {
        // Remove existing description if any
        const existingDescription = document.querySelector('.album-description');
        if (existingDescription) {
            existingDescription.remove();
        }

        // Create description element
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'album-description';
        
        const descriptionTitle = document.createElement('h3');
        descriptionTitle.textContent = album.title;
        
        // Create a container for the description text with scrolling
        const descriptionTextContainer = document.createElement('div');
        descriptionTextContainer.className = 'description-container';
        
        const descriptionText = document.createElement('p');
        descriptionText.textContent = album.longDescription;
        descriptionText.className = 'description-text en';
        
        descriptionTextContainer.appendChild(descriptionText);
        descriptionContainer.appendChild(descriptionTitle);
        descriptionContainer.appendChild(descriptionTextContainer);
        
        // Add translation button if the album has a Chinese translation
        if (album.hasTranslation) {
            const translationButton = document.createElement('button');
            translationButton.className = 'translation-button';
            translationButton.textContent = '切换到中文';
            translationButton.addEventListener('click', function() {
                toggleTranslation(album, descriptionText, translationButton);
            });
            descriptionContainer.appendChild(translationButton);
            
            // Add Chinese description (hidden by default)
            const descriptionTextCN = document.createElement('p');
            descriptionTextCN.textContent = album.longDescriptionCN;
            descriptionTextCN.className = 'description-text cn';
            descriptionTextCN.style.display = 'none';
            descriptionTextContainer.appendChild(descriptionTextCN);
        }
        
        // Add description to modal
        modal.querySelector('.modal-content').appendChild(descriptionContainer);
    }
    
    // Function to toggle between English and Chinese translations
    function toggleTranslation(album, descriptionText, translationButton) {
        const descriptionTextCN = document.querySelector('.description-text.cn');
        
        if (currentLanguage === 'en') {
            // Switch to Chinese
            descriptionText.style.display = 'none';
            descriptionTextCN.style.display = 'block';
            translationButton.textContent = 'Switch to English';
            currentLanguage = 'cn';
        } else {
            // Switch to English
            descriptionText.style.display = 'block';
            descriptionTextCN.style.display = 'none';
            translationButton.textContent = '切换到中文';
            currentLanguage = 'en';
        }
    }

    // Function to add pagination controls
    function addPaginationControls(totalPhotos) {
        const totalPages = Math.ceil(totalPhotos / photosPerPage);
        
        // Remove existing pagination controls if any
        const existingControls = document.querySelector('.pagination-controls');
        if (existingControls) {
            existingControls.remove();
        }
        
        // Only add pagination if there are more than one page
        if (totalPages > 1) {
            const paginationControls = document.createElement('div');
            paginationControls.className = 'pagination-controls';
            
            // Previous button
            const prevButton = document.createElement('button');
            prevButton.className = 'pagination-button prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayPhotos(albums[currentAlbum].photos, currentPage);
                    updatePaginationButtons();
                }
            });
            
            // Page indicator
            const pageIndicator = document.createElement('span');
            pageIndicator.className = 'page-indicator';
            pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
            
            // Next button
            const nextButton = document.createElement('button');
            nextButton.className = 'pagination-button next';
            nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayPhotos(albums[currentAlbum].photos, currentPage);
                    updatePaginationButtons();
                }
            });
            
            paginationControls.appendChild(prevButton);
            paginationControls.appendChild(pageIndicator);
            paginationControls.appendChild(nextButton);
            
            // Add pagination controls to modal
            modal.querySelector('.modal-content').appendChild(paginationControls);
            
            // Function to update pagination buttons
            function updatePaginationButtons() {
                prevButton.disabled = currentPage === 1;
                nextButton.disabled = currentPage === totalPages;
                pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
            }
        }
    }

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 