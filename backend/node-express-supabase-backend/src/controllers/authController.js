const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.register = async (req, res) => {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ user });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ user });
};

exports.logout = async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Logged out successfully' });
};