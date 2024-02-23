

using MLDiabetesService;

namespace Application.Image.DTOS
{
    public class MLOutputDTO
    {
        public uint Label { get; set; }

        public string PredictedLabel { get; set; }

        public float[] Score { get; set; }

        public MLOutputDTO(MLDiabetes.ModelOutput result)
        {
            this.Label = result.Label;
            this.PredictedLabel = result.PredictedLabel;
            this.Score = result.Score;
        }  
    }
}
