<script>
    let data;
    let logo;
    let content;

    let fileExample1 = "template1.json";
    let fileExample2 = "template2.json";
    let currentFile = fileExample1;

    // Charger les données de manière asynchrone
    async function loadData() {
        const response = await fetch(currentFile);
        data = await response.json();

        if(data.settings && data.settings.logo){
            logo = data.settings.logo
        } else {
            logo = "logo.png"
        }
        
        if (data.content && Object.keys(data.content).length > 0) {
            content = data.content
        } else {
            content = {"My Links":data.quickLinks}
        }

        if (data.settings && data.settings.background && typeof data.settings.background === "string") {
            if (/^#[0-9a-fA-F]{6}$/.test(data.settings && data.settings.background)) {
                document.body.style.backgroundColor = data.settings.background;
            } else if (/^https?:\/\/[^\s]+/i.test(data.settings && data.settings.background)) {
                document.body.style.backgroundImage = `url(${data.settings.background})`;
                document.body.style.backgroundSize = "cover";
            }
        } else {
            document.body.style.backgroundColor = "var(--black)";
        }

        if (data.settings && data.settings.primaryColor) {
            document.documentElement.style.setProperty('--primary-color', data.settings.primaryColor);
        }
        if (data.settings && data.settings.secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', data.settings.secondaryColor);
        }
        if (data.settings && data.settings.tertiaryColor) {
            document.documentElement.style.setProperty('--tertiary-color', data.settings.tertiaryColor);
        }
    }

    loadData();
</script>

<svelte:head>
  <title>{data ? data.name : 'Loading...'}</title>
  <link rel="icon" href={logo} type="image/png">
</svelte:head>

<div id="exampleNavBar">
    <button on:click={() => {currentFile = fileExample1; loadData();}}>Example 1</button>
    <button on:click={() => {currentFile = fileExample2; loadData();}}>Example 2</button>
</div>

<main>
  <img id="profile-pic"
      src={data ? data.profilPicture : 'Loading...'}
      alt={data ? data.name : 'Loading...'}   
  >
  <h1>{data ? data.name : 'Loading...'}</h1>
  <div id="quick-links">
      {#each Object.entries(data ? data.quickLinks : {}) as [key, value]}
          <a href={value} target="_blank">
              <img height="32" width="32" src="https://cdn.simpleicons.org/{key}" alt={key}/>
          </a>
      {/each}
  </div>
  <div id="content">
      {#each Object.entries(data ? content : {}) as [key, val]}
          <div id="block">
              <h2>{key}</h2>
              <ul>
                  {#each Object.entries(data ? val : {}) as [key, value]}
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
    #exampleNavBar{
        position: fixed;
        top: 5vh;
        right: 5vh;
        background-color: #fff;
        border-radius: 1em;
        padding: 10px;
        height: 50px;

        button{
            margin: 0 5px;
            padding: 5px 10px;
            border: none;
            border-radius: 1em;
            background-color: var(--primary-color);
            color: #fff;
            cursor: pointer;
            transition: .2s;
            height: 100%;
        }
    }
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
            color: var(--primary-color);
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
            flex-direction: column;
            gap: 20px;

            #block{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                h2{
                    font-size: 24px;
                    font-weight: 400;
                    color: var(--primary-color);
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
                        background-color: var(--secondary-color);
                        border-radius: 1em;
                        overflow: hidden;
                        transition: .2s;

                        &:hover{
                            background-color: var(--tertiary-color);
                        }
                        
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
