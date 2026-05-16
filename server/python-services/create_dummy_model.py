import torch
import torch.nn as nn
import torchvision.models as models

# Create EXACT same model as in app.py
model = models.resnet18(weights=None)  # weights=None means no pretrained
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 2)      # 2 classes: Normal, Pneumonia

# Save the model's state_dict
torch.save(model.state_dict(), 'model.pth')
print("✅ Correct ResNet-18 dummy model saved as model.pth")
print(f"Model file size: {model.state_dict().__sizeof__()} bytes (approx 45 MB expected)")