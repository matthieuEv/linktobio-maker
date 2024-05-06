<script>
    //https://simpleicons.org/
    import data from '../template.json'
    let logo;
    let content;
    
    if(data.settings.logo){
        logo = data.settings.logo
    } else {
        logo = "../public/logo.png"
    }
    
    if (data.content && Object.keys(data.content).length > 0) {
        content = data.content
    } else {
        content = {"My Links":data.quickLinks}
    }

    if (data.settings.background && typeof data.settings.background === "string") {
        if (/^#[0-9a-fA-F]{6}$/.test(data.settings.background)) {
            document.body.style.backgroundColor = data.settings.background;
        } else if (/^https?:\/\/[^\s]+/i.test(data.settings.background)) {
            document.body.style.backgroundImage = `url(${data.settings.background})`;
            document.body.style.backgroundSize = "cover";
        }
    } else {
        document.body.style.backgroundColor = "var(--black)";
    }
</script>

<svelte:head>
    <title>{data.name}</title>
    <link rel="icon" href={logo} type="image/png">
</svelte:head>

<main>
    <img id="profile-pic"
        src={data.profilPicture}
        alt={data.name}   
    >
    <h1>Jhon Doe</h1>
    <div id="quick-links">
        {#each Object.entries(data.quickLinks) as [key, value]}
            <a href={value} target="_blank">
                <img height="32" width="32" src="https://cdn.simpleicons.org/{key}" alt={key}/>
            </a>
        {/each}
    </div>
    <div id="content">
        {#each Object.entries(content) as [key, val]}
            <div id="block">
                <h2>{key}</h2>
                <ul>
                    {#each Object.entries(val) as [key, value]}
                        <li>
                            <a href={value}>
                                <img height="32" width="32" src="https://cdn.simpleicons.org/{key}" alt={key}/>
                                {key}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10vh 0;
        border-radius: 2em;
        background-color: rgba(255, 255, 255, 0.85);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        
        #profile-pic{
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }

        h1 {
            margin: 10px 0;
            font-size: 24px;
            font-weight: 400;
            color: var(--quaternary-color);
        }

        #quick-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            max-width: 90%;
            margin-bottom: 10px;

            a {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        #content{
            margin-top: 20px;
            width: 90%;
            display: flex;
            justify-content: center;

            #block{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                h2{
                    font-size: 24px;
                    font-weight: 400;
                    color: var(--quaternary-color);
                    display: flex;
                }

                ul{
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    width: 100%;
                    padding-top: 10px;

                    li{
                        width: 100%;
                        height: 52px;
                        background-color: var(--tertiary-color);
                        border-radius: 1em;
                        overflow: hidden;
                        
                        a{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                            text-decoration: none;
                            color: var(--black);
                            position: relative;

                            img{
                                position: absolute;
                                left: 10px;
                            }
                        }
                    }
                }
            }

        }
    }
  
</style>
