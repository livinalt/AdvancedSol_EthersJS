- Setup NextJS App
    
    Create a nextjs app with below command
    
    ```bash
    npx create-next-app storage-frontend
    ```
    
    Add tailwind (to make it simpler to add styling for frontend elements)
    
    [https://tailwindcss.com/docs/guides/nextjs](https://tailwindcss.com/docs/guides/nextjs) (Step 2 and 3 from the link)


- Metamask and Network Setup
    
    Make sure you installed metamask or other wallet provider.
    
    Switch the network to GoerliTestNet
    
    Make sure to have some GoerliETH to test the app.


- To connect your own contract

    Update the `/next.config.js` env variables `CONTRACT_ADDRESS` and `ABI`