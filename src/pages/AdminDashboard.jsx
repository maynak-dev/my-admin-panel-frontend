import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const drawerWidth = 240;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users/');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      showSnackbar('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleApprove = async (userId) => {
    try {
      await api.patch(`/admin/users/${userId}/approve/`, { is_approved: true });
      setUsers(users.map(u => u.id === userId ? { ...u, is_approved: true } : u));
      showSnackbar('User approved successfully');
    } catch (err) {
      showSnackbar('Failed to approve user', 'error');
    }
  };

  const handleMakeStaff = async (userId) => {
    try {
      await api.patch(`/admin/users/${userId}/make-staff/`);
      setUsers(users.map(u => u.id === userId ? { ...u, is_staff: true } : u));
      showSnackbar('User promoted to admin');
    } catch (err) {
      showSnackbar('Failed to promote user', 'error');
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    try {
      await api.delete(`/admin/users/${selectedUser.id}/`);
      setUsers(users.filter(u => u.id !== selectedUser.id));
      showSnackbar('User deleted successfully');
    } catch (err) {
      showSnackbar('Failed to delete user', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate stats
  const totalUsers = users.length;
  const approvedUsers = users.filter(u => u.is_approved).length;
  const pendingUsers = users.filter(u => !u.is_approved).length;
  const adminUsers = users.filter(u => u.is_staff).length;

  return (
    <Box sx={{ display: 'flex', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Decorative floating circles */}
      <Box sx={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', top: -100, right: -100 }} />
      <Box sx={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: -150, left: -150 }} />

      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2, color: '#fff' }}>
            {user?.username} (Admin)
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '20px', '&:hover': { background: 'rgba(255,255,255,0.2)' } }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRight: 'none', boxShadow: '2px 0 10px rgba(0,0,0,0.1)' },
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
            Admin Panel
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" startIcon={<PersonIcon />} sx={{ mb: 1, background: 'rgba(255,255,255,0.25)', color: '#fff', '&:hover': { background: 'rgba(255,255,255,0.4)' } }}>
              Users
            </Button>
            {/* Add more menu items if needed */}
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative', overflow: 'auto' }}>
        <Toolbar /> {/* Spacer for AppBar */}

        {/* Glass‑morphism content container */}
        <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'rgba(255,255,255,0.9)', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom sx={{ fontWeight: 600 }}>
                    Total Users
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: '#e8f5e8', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom sx={{ fontWeight: 600 }}>
                    Approved
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{approvedUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: '#fff3e0', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom sx={{ fontWeight: 600 }}>
                    Pending
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{pendingUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: '#e3f2fd', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom sx={{ fontWeight: 600 }}>
                    Admins
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{adminUsers}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Users Table */}
          <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>Avatar</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>Username</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>Role</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', background: '#f5f5f5' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">Loading...</TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">No users found.</TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id} hover sx={{ '&:hover': { background: 'rgba(102,126,234,0.05)' } }}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <Avatar src={`https://ui-avatars.com/api/?name=${user.username}&background=random`} />
                        </TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.first_name} {user.last_name}</TableCell>
                        <TableCell>
                          {user.is_approved ? (
                            <Chip icon={<CheckCircleIcon />} label="Approved" color="success" size="small" />
                          ) : (
                            <Chip icon={<CancelIcon />} label="Pending" color="warning" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {user.is_staff ? (
                            <Chip icon={<AdminIcon />} label="Admin" color="primary" size="small" />
                          ) : (
                            <Chip icon={<PersonIcon />} label="User" variant="outlined" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {!user.is_approved && (
                            <IconButton color="success" onClick={() => handleApprove(user.id)} title="Approve">
                              <VerifiedIcon />
                            </IconButton>
                          )}
                          {user.is_approved && !user.is_staff && (
                            <IconButton color="primary" onClick={() => handleMakeStaff(user.id)} title="Make Admin">
                              <AdminIcon />
                            </IconButton>
                          )}
                          <IconButton color="error" onClick={() => handleDeleteClick(user)} title="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user "{selectedUser?.username}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;