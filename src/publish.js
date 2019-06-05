var ghpages = require('gh-pages');
ghpages.publish('../dist', {
	branch: 'gh-pages',
	repo: 'https://github.com/bennyli519/vue-draggable-layout.git',
	message:'更新发布'
}, function(err) {
  console.log('docs同步完成!');
});