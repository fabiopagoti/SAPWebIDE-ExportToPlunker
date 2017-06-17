# SAP Web IDE - Export To Plunker Feature
This is a feature created for the SAP Web IDE. It enables you to export projects to Plunker. Plunker is place where you can share you code and immediately see the result.

See how it works in this video:
<p align="center">
<a href="https://youtu.be/2N4bNtBIyZQ" target="_blank">
<img src="http://img.youtube.com/vi/2N4bNtBIyZQ/0.jpg" 
alt="Export to Plunker in the SAP Web IDE" width="640" height="360" /></a>
</p>


#Getting started

##Create destination

Create a file without extension and past the following lines in the file:
```
Description=My Feature ExportToPlunker
Type=HTTP
Authentication=NoAuthentication
WebIDEUsage=feature
Name=ExportToPlunker
WebIDEEnabled=true
CloudConnectorVersion=2
URL=https\://sapwebideexporttoplunker-a6ac3f497.dispatcher.hana.ondemand.com
ProxyType=Internet
```

##Import destination

1. Open your HANA Cloud Platform Cockpit
2. Go to Connectivity
3. Open Destinations
4. Import the created destination
5. Save

##SAPWebIDE Settings

1. Start by restarting the SAPWebIDE
2. Open settings
3. Select Plugins
4. Change repository to "Features"
5. Enable plunkerexport
6. Restart the SAPWebIDE


#Contribute

This is a plugin from me as a developer to help you as a developer. If you have a great idea or just want to help your welcome to help me improving this plugin!

#Contact

You're always welcome to update me about bugs at wouterlemaire120@hotmail.com