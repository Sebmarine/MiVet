USE [MiVet]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Select_ByCreatedBy]    Script Date: 11/18/2022 3:26:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author:		Sebastian Hernandez
-- Create date: 10/20/2022
-- Description:	Proc to select the external link created by a user 
-- Code Reviewer: Chris Myers


-- MODIFIED BY: author
-- MODIFIED DATE:12/1/2020
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER proc [dbo].[ExternalLinks_Select_ByCreatedBy]

	@UserId int

as

/*

	Declare @UserId int = 30

	Execute dbo.ExternalLinks_Select_ByCreatedBy
		@UserId

	SELECT * FROM dbo.Users
	SELECT * FROM dbo.UrlTypes
	SELECT * FROM dbo.EntityTypes
*/


Begin

	SELECT 
		EL.[Id]
		,UT.Id as [UrlTypeId]
		,UT.[Name] as [UrlTypeName]
		,EL.[Url]
		,El.[EntityId]
		,ET.ID as [EntityTypeId]
		,ET.[Name] as [EntityTypeName]
		,EL.[DateCreated]
		,El.[DateModified]
	FROM [dbo].[ExternalLinks] as EL 
	--inner join dbo.Users as U on EL.UserId = U.Id
	inner join dbo.UrlTypes as UT on EL.[UrlTypeId] = UT.Id
	inner join dbo.EntityTypes as ET on EL.EntityTypeId = ET.Id

End