import os
import re

files_to_fix = [
    'zomato.html',
    'jtbd.html',
    'vita-fit.html',
    'growgrid.html',
    'amazon-ux.html'
]

for filename in files_to_fix:
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r') as f:
        content = f.read()
    
    # Add stylesheet if missing
    if '<link rel="stylesheet" href="./style.css"' not in content:
        content = content.replace('</head>', '  <link rel="stylesheet" href="./style.css" />\n  </head>')
    
    # Add body class and glows
    if '<body class="case-study-page">' not in content:
        content = re.sub(
            r'<body>', 
            '<body class="case-study-page">\n    <div class="background-glow blur-1"></div>\n    <div class="background-glow blur-2" style="background: var(--accent-secondary);"></div>', 
            content
        )
    
    # Fix navbar
    content = re.sub(
        r'<nav class="navbar">.*?</nav>',
        '<nav class="navbar">\n      <a href="/index.html" class="logo">AS.</a>\n      <a href="/index.html" class="nav-btn">&larr; Back to Portfolio</a>\n    </nav>',
        content,
        flags=re.DOTALL
    )
    
    # Fix header classes
    content = content.replace('class="cs-header reveal"', 'class="cs-hero reveal"')
    content = content.replace('class="cs-title"', 'class="hero-title"')
    content = content.replace('class="cs-subtitle"', 'class="hero-subtitle"')
    
    # Fix next link class
    content = re.sub(
        r'<a href="(.*?)" class="nav-link">(.*?)</a>',
        r'<a href="\1" class="btn primary-btn">\2</a>',
        content
    )

    # Some fonts had Plus Jakarta Sans, let's just make sure it's consistent if needed, but not critical.

    with open(filename, 'w') as f:
        f.write(content)
    
    print(f"Fixed {filename}")
