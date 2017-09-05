package twitter;

import java.util.List;

import twitter4j.*;
import twitter4j.auth.AccessToken;


/**
 * @author BALA
 *
 *refer this for the examples - https://github.com/yusuke/twitter4j/tree/master/twitter4j-examples/src/main/java/twitter4j/examples
 *
 *main page - https://github.com/yusuke/twitter4j
 *
 *download twitter4j and include the twitter4j-core jar in the library
 *
 *replace the auth key & its secret key and consumer key and its secret key with yours
 *
 *i have included some basic functionality of the api for further details refer the above git repo
 *
 *
 */
public class Test
{
	/**
	 * @param args
	 */
	public static void main(String[] args)
	{

		System.setProperty("https.proxyHost", "10.145.22.10");
		System.setProperty("https.proxyPort", "8080");
		System.setProperty("http.proxyHost", "10.145.22.10");
		System.setProperty("http.proxyPort", "8080");

		Twitter twitter = new TwitterFactory().getInstance();
		twitter.setOAuthConsumer("0dU42UqfpFc5FWgyfkMKxfoYl", "c0QDcuOdgcyyPieIqpgKsQxUie3TyGkrywBgzZZdrNLwcNrlWB");
		twitter.setOAuthAccessToken(new AccessToken("520474727-ZVfWHPHMSCYuhFwDPuoS3ZxG4Szib1Ig3LQd507q",
				"bYpn9NJt6D0R4wZY5cd03ELen2ZdGAGwyNQ7223lIWPrS"));



		try
		{
			//users statues
//			 List<Status> statuses;
//          String user="abinayaj5";
//          
//          //to get the programmers name
//          //user = twitter.verifyCredentials().getScreenName();
//      
//              statuses = twitter.getUserTimeline(user);
//         
//          System.out.println("Showing @" + user + "'s user timeline.");
//          for (Status status : statuses) {
//              System.out.println("@" + status.getUser().getScreenName() + " - " + status.getText());
//}
          
//			home timeline (programmers)
//			  User user = twitter.verifyCredentials();
//           List<Status> statuses = twitter.getHomeTimeline();
//           System.out.println("Showing @" + user.getScreenName() + "'s home timeline.");
//           for (Status status : statuses) {
//               System.out.println("@" + status.getUser().getScreenName() + " - " + status.getText());
//}
			
			//get all the users with same name   
			int page = 1;
			ResponseList<User> users;
			do
			{
				users = twitter.searchUsers("abinaya", page);
				for (User user : users)
				{
					if (user.getStatus() != null)
					{
						System.out.println("username  :  @" + user.getScreenName() + "\nstatus    :  " + user.getStatus().getText() + "\nlocation  :  " + user.getLocation()
								+ "\nname      :  " + user.getName() + "\nfriends   :  " + user.getFriendsCount() + "\nPic URL   :  " + user.getOriginalProfileImageURL()+"\n");
					}
					else
					{
						// the user is protected
						System.out.println("username  :  @"  + user.getScreenName()+"\n");
					}
				}
				page++;
			}
			while (users.size() != 1 && page < 50);
			System.out.println("done.");

			// to find a particular user
//			User user = twitter.showUser("abinayaj5");
//			if (user.getStatus() != null)
//			{
//				System.out.println("@" + user.getScreenName() + " - " + user.getStatus().getText());
//			}
//			else
//			{
//				// the user is protected
//				System.out.println("@" + user.getScreenName());
//			}

			// code to find the status having the string
//			Query query = new Query("#NEETKilledAnitha");
//			QueryResult result;
//			do
//			{
//				result = twitter.search(query);
//				List<Status> tweets = result.getTweets();
//				for (Status tweet : tweets)
//				{
//					System.out.println("@" + tweet.getUser().getScreenName() + " - " + tweet.getText());
//				}
//			}
//			while ((query = result.nextQuery()) != null);
//			System.exit(0);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			System.out.println(e.getMessage());
			System.exit(-1);
		}
	}
}
