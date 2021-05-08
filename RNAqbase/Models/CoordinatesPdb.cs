using System;
using System.Text;

namespace RNAqbase.Models
{
    public class CoordinatesPdb
    {
        
        public string[] Coordinates { get; set; }
        
        public string CoordinatesAsString
        {
            get
            {
	            var sb = new StringBuilder();
                sb.AppendLine("data_onquadro");
                sb.AppendLine(
	                @"
_entity.id 1
_entity.type polymer

loop_
_atom_site.group_PDB
_atom_site.id
_atom_site.auth_atom_id
_atom_site.label_alt_id
_atom_site.auth_comp_id
_atom_site.auth_asym_id
_atom_site.auth_seq_id
_atom_site.pdbx_PDB_ins_code
_atom_site.Cartn_x
_atom_site.Cartn_y
_atom_site.Cartn_z
_atom_site.occupancy
_atom_site.B_iso_or_equiv
_atom_site.type_symbol
_atom_site.pdbx_formal_charge
					");
               
                for (int i = 0; i < Coordinates.Length; i++)
                {
                    sb.Append(Coordinates[i] + '\n');
                }
                
                return sb.ToString();
            }
        }

        private const string CoordinatesStart = "ATOM ";
    }
    
}
