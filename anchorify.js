/*
 * Copyright Adam Pritchard 2015
 * Slight modifications by Shane Brass to work with pug filter 2018
 * MIT License : http://adampritchard.mit-license.org/
 */

function slugify(s, md) {
    return s.replace(/\s/g, '_').replace(/[^\w_-]/g, '').toLowerCase();
}

function makeRule(md, options) {
    return function addHeadingAnchors(state) {
        for (var i=0; i<state.tokens.length-1; i++) {
            if (state.tokens[i].type!=='heading_open' ||
                state.tokens[i+1].type!=='inline') {
                continue;
            }

            var headingOpenToken=state.tokens[i+1];
            var headingInlineToken=state.tokens[i+1];

            if (!headingInlineToken.content) {
                continue;
            }

            var anchorName=slugify(headingInlineToken.content, md);

            var anchorToken=new state.Token('html_inline', '', 0);
            anchorToken.content='<a name="'+anchorName+
                '" class="anchorified" href="#"></a>';
            headingInlineToken.children.unshift(anchorToken);

            i+=2;
        }
    };
}

module.exports=function headinganchor_plugin(md, opts) {
    var options=md.utils.assign({}, opts);
    md.core.ruler.push('heading_anchors', makeRule(md, options));
};
