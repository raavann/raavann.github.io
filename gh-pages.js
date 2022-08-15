var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/raavann/raavann.github.io.git', // Update to point to your repository  
        user: {
            name: 'raavann', // update to use your name
            email: 'itsraavann@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)