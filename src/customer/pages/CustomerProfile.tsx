import { motion } from 'framer-motion';
import { User, Building, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../shared/animations';
import { businessProfile } from '../../shared/data/customerData';

export default function CustomerProfile() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <motion.div variants={staggerItem} className="page-header">
        <h1 className="text-h1">Business Profile</h1>
        <p>Manage your enterprise details and connected identities</p>
      </motion.div>

      <div className="grid grid-2">
        <motion.div variants={staggerItem} className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building size={32} color="var(--text-secondary)" />
            </div>
            <div>
              <h2 className="text-h2" style={{ marginBottom: 4 }}>{businessProfile.name}</h2>
              <div className="badge badge-success"><ShieldCheck size={12} /> Verified Enterprise</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <span className="text-secondary">GSTIN</span>
              <span className="text-mono">{businessProfile.gstin}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <span className="text-secondary">Udyam Registration</span>
              <span className="text-mono">{businessProfile.udyam}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <span className="text-secondary">PAN</span>
              <span className="text-mono">{businessProfile.pan}</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="card">
          <h3 className="text-h3" style={{ marginBottom: 24 }}>Contact Information</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <User size={20} color="var(--text-muted)" />
              <div>
                <div className="text-sm font-medium">Primary Contact</div>
                <div className="text-secondary">{businessProfile.contactPerson}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <Mail size={20} color="var(--text-muted)" />
              <div>
                <div className="text-sm font-medium">Email Address</div>
                <div className="text-secondary">{businessProfile.email}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <Phone size={20} color="var(--text-muted)" />
              <div>
                <div className="text-sm font-medium">Phone Number</div>
                <div className="text-secondary">{businessProfile.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <MapPin size={20} color="var(--text-muted)" />
              <div>
                <div className="text-sm font-medium">Registered Address</div>
                <div className="text-secondary">{businessProfile.city}, {businessProfile.state}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
