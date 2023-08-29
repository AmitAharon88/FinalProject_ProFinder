export const _logout = (req, res) => {
    req.headers['x-access-token'] = null;
    res.clearCookie('token');
    return res.sendStatus(200);
};