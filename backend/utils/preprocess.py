def extract_features(data):
    """Extract and validate features from request JSON."""
    required = ['cgpa', 'internships', 'projects', 'communication', 'coding']
    for field in required:
        if field not in data:
            raise ValueError(f"Missing field: {field}")

    return [[
        float(data['cgpa']),
        int(data['internships']),
        int(data['projects']),
        int(data['communication']),
        int(data['coding']),
    ]]
