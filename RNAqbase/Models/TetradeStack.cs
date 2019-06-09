namespace RNAqbase.Models
{
	public class TetradeStack : BaseEntity
	{
		public int Id { get; set; }
		public Tetrad Tetrade1 { get; set; }
		public Tetrad Tetrade2 { get; set; }
		public float Rise { get; set; }
		public float Twist { get; set; }
	}
}
