using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class Pdb : BaseEntity
	{
		public int Id { get; set; }
		public int Assembly { get; set; }
		public float Resolution { get; set; }
		public string Visualization { get; set; }
		public Experiment Experiment { get; set; }
	}
}
